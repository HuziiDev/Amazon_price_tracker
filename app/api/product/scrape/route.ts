import { NextRequest, NextResponse } from 'next/server';
import Product from '@/lib/models/product.model';
import { conenctToDb } from '@/lib/mongoose';
import { extractCurrency, extractPrice, getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';

const BRIGHTDATA_API_KEY = process.env.BRIGHT_API_KEY
const BRIGHTDATA_ENDPOINT = process.env.BRIGHT_ENDPOINT

export async function POST(req: NextRequest) {
  await conenctToDb()
  
  try {
    const { productUrl } = await req.json();

    if (!productUrl) {
      return NextResponse.json(
        { success: false, message: 'Product URL is required' },
        { status: 400 }
      );
    }

    if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_ENDPOINT) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Making request to Bright Data for:', productUrl);

    const response = await axios.post(
      BRIGHTDATA_ENDPOINT,
      {
        zone: 'price_wise2',
        url: productUrl,
        format: 'raw'
      },
      {
        headers: {
          'Authorization': `Bearer ${BRIGHTDATA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const $ = cheerio.load(response.data);
    const title = $('#productTitle').text().trim();

    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen'),
      $('.a-section.a-spacing-none.aok-align-center .a-price .a-offscreen')
    );

    const originalPrice = extractPrice(
      $('.a-price.a-text-price span.a-offscreen'),
      $('.basisPrice .a-offscreen'),
      $('span.a-price[data-a-strike="true"] .a-offscreen')
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') || '{}';

    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($('.a-price-symbol').text().trim() || '');
    const discountRate = $('.savingsPercentage').text().replace(/[-()%]/g, '').trim();

    // Convert prices to numbers
    const currentPriceNum = Number(currentPrice) || Number(originalPrice) || 0;
    const originalPriceNum = Number(originalPrice) || Number(currentPrice) || 0;

    // Check if product exists
    const existingProduct = await Product.findOne({ url: productUrl });

    let productData;

    if (existingProduct) {
      // ✅ EXISTING PRODUCT: Add to price history
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        {
          price: currentPriceNum,
          date: new Date()
        }
      ];

      productData = {
        url: productUrl,
        currency: currency || '$',
        image: imageUrls[0] || existingProduct.image,
        title: title || existingProduct.title,
        currentPrice: currentPriceNum,
        originalPrice: originalPriceNum,
        priceHistory: updatedPriceHistory,
        discountRate: Number(discountRate) || 0,
        category: existingProduct.category || 'category',
        reviewsCount: existingProduct.reviewsCount || 100,
        isOutOfStock: outOfStock,
        lowestPrice: getLowestPrice(updatedPriceHistory) || currentPriceNum,
        highestPrice: getHighestPrice(updatedPriceHistory) || currentPriceNum,
        averagePrice: getAveragePrice(updatedPriceHistory) || currentPriceNum,
      };
    } else {
      // ✅ NEW PRODUCT: Initialize with current price
      const initialPriceHistory = [{
        price: currentPriceNum,
        date: new Date()
      }];

      productData = {
        url: productUrl,
        currency: currency || '$',
        image: imageUrls[0] || '',
        title: title || 'Unknown Product',
        currentPrice: currentPriceNum,
        originalPrice: originalPriceNum,
        priceHistory: initialPriceHistory,  // ✅ Initialize with current price
        discountRate: Number(discountRate) || 0,
        category: 'category',
        reviewsCount: 100,
        isOutOfStock: outOfStock,
        lowestPrice: currentPriceNum,  // ✅ Use actual price, not 0
        highestPrice: originalPriceNum || currentPriceNum,
        averagePrice: currentPriceNum,  // ✅ Use actual price, not 0
      };
    }

    console.log('💾 Saving product with data:', {
      title: productData.title,
      currentPrice: productData.currentPrice,
      lowestPrice: productData.lowestPrice,
      priceHistoryLength: productData.priceHistory.length
    });

    // Save or update product
    const newProduct = await Product.findOneAndUpdate(
      { url: productUrl },
      productData,
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      id: String(newProduct._id),
      message: 'Product scraped successfully',
      product: {
        title: newProduct.title,
        currentPrice: newProduct.currentPrice,
        lowestPrice: newProduct.lowestPrice
      }
    });

  } catch (error: any) {
    console.error('❌ Scrape API Error:', error.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message: `Failed to scrape product: ${error.response?.data?.error || error.message}`,
      },
      { status: 500 }
    );
  }
}