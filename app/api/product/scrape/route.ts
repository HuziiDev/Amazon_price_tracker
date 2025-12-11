import { NextRequest, NextResponse } from 'next/server';
import Product from '@/lib/models/product.model';
import { conenctToDb } from '@/lib/mongoose';
import { scrapeAmazonProduct } from '@/lib/scraper';
import { extractCurrency, extractPrice, getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import axios from 'axios';

import * as cheerio from 'cheerio';

const BRIGHTDATA_API_KEY =process.env.BRIGHT_API_KEY
const BRIGHTDATA_ENDPOINT =process.env.BRIGHT_ENDPOINT


export async function POST(req: NextRequest) {
    conenctToDb()
  try {
    const { productUrl } = await req.json();  // ✅ Changed from url

    if (!productUrl) {
      return NextResponse.json(
        { success: false, message: 'Product URL is required' },
        { status: 400 }
      );
    }
 if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_ENDPOINT) {
      console.error('Missing environment variables:', {
        hasApiKey: !!BRIGHTDATA_API_KEY,
        hasEndpoint: !!BRIGHTDATA_ENDPOINT
      });
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }
    console.log('Making request to Bright Data with:', {
      zone: 'pricewise',
      url: productUrl,  // ✅ Changed
      format: 'raw'
    });

    const response = await axios.post(
      BRIGHTDATA_ENDPOINT,
      {
        zone: 'price_wise2',
        url: productUrl,  // ✅ Changed
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

    const scrapedProduct = {
      url: productUrl,  // ✅ Changed
      currency: currency || '$',
      image: imageUrls[0] || null,  // ✅ Added null fallback
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
   console.log(scrapedProduct)
     if(!scrapedProduct){
                 throw new Error('Failed to scrape product data');
             }
            let product = scrapedProduct
          
            const existingProduct = await Product.findOne({
             url: scrapedProduct.url
     
            });
     
            if(existingProduct){
             const updatedPriceHistory : any = [...existingProduct.priceHistory, {
                 price: scrapedProduct.currentPrice,
             }]
     
             product = {
                 ...scrapedProduct,
                 priceHistory: updatedPriceHistory,
                 lowestPrice: getLowestPrice(updatedPriceHistory),
                 highestPrice: getHighestPrice(updatedPriceHistory),
                 averagePrice: getAveragePrice(updatedPriceHistory),
                 
             }
            }
            const newProduct = await Product.findOneAndUpdate(
         {url: scrapedProduct.url},
         product,
         {new: true, upsert: true}
            )
     
        
       
             
           

    return NextResponse.json({
      success: true,
      id: String(newProduct._id),
      message: 'Product scraped successfully'
    });

  } catch (error: any) {
    console.error('❌ Scrape API Error:', error.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message: `Failed to scrape product: ${error.response?.data?.error || error.message}`,
        details: error.response?.data?.details || {}
      },
      { status: 500 }
    );
  }
}