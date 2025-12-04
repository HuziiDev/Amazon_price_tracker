// lib/scraper/index.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from '../utils';
const BRIGHTDATA_API_KEY = 'b70b80ade0f760162779f27b0c6b1d646e0588d2face9244f665abf086992d86';
const BRIGHTDATA_ENDPOINT = 'https://api.brightdata.com/request';

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    return;
  }

  try {
    console.log('Making request to Bright Data with:', {
      zone: 'pricewise',
      url: url,
      format: 'raw'
    });

    const response = await axios.post(
      BRIGHTDATA_ENDPOINT,
      {
        zone: 'pricewise',
        url: url,
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
)

const originalPrice = extractPrice(
    $('.a-price.a-text-price span.a-offscreen'), // List price with strikethrough
    $('.basisPrice .a-offscreen'), // Alternative basis price
    $('span.a-price[data-a-strike="true"] .a-offscreen') // Struck-through price
)
 const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

const images = $('#imgBlkFront').attr('data-a-dynamic-image')  ||
$('#landingImage').attr('data-a-dynamic-image') || '{}';

const imageUrls = Object.keys(JSON.parse(images));

const currency = extractCurrency($('.a-price-symbol').text().trim() || '');
const discountRate = $('.savingsPercentage').text().replace(/[-()%]/g, '').trim();

const data = {
    url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount:100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),

}

console.log(data)
return data


  } catch (error: any) {
    // Log FULL error details
    console.error('❌ Bright Data API Error:', error.response?.data || error.message);
    
    throw new Error(
      `Bright Data API Error: ${error.response?.data?.error || error.message}\n` +
      `Details: ${JSON.stringify(error.response?.data?.details || {})}`
    );
  }
}