// lib/cron/priceUpdateCron.ts
import Product from '@/lib/models/product.model';
import { conenctToDb } from '@/lib/mongoose';
import { 
  getAveragePrice, 
  getHighestPrice, 
  getLowestPrice, 
  getEmailNotifType 
} from '@/lib/utils';
import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import axios from 'axios';

// Track if cron is running
let isRunning = false;

// Helper function to call your scrape API
async function scrapeProductViaAPI(url: string) {
  try {
  
       const baseUrl = process.env.NODE_ENV === 'production' 
      ? `https://${ process.env.NEXT_PUBLIC_APP_URL}`
      : 'http://localhost:3000';
    
    console.log(`🌐 Calling API at: ${baseUrl}/api/product/scrape`);
    
    const res = await axios.post(`${baseUrl}/api/product/scrape`, {
      productUrl: url
    });
    
    const data = res.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Scraping failed');
    }

    return data.product;
  } catch (error) {
    console.error('API scraping error:', error);
    throw error;
  }
}

// Main function to update all products
export async function updateAllProducts() {
  if (isRunning) {
    console.log('⏭️  Previous cron job still running, skipping...');
    return;
  }

  isRunning = true;
  console.log('🚀 Starting price update cron job at:', new Date().toISOString());

  try {
    await conenctToDb();
    
    const products = await Product.find({});
    
    if (!products || products.length === 0) {
      console.log('📦 No products found to update');
      return;
    }

    console.log(`📊 Found ${products.length} products to update`);

    let successCount = 0;
    let failCount = 0;
    let notificationCount = 0;

    // Process products one by one (to avoid rate limits)
    for (const currentProduct of products) {
      try {
        console.log(`\n🔍 Scraping via API: ${currentProduct.title.substring(0, 50)}...`);

        // Scrape using your API endpoint
        const scrapedProduct = await Promise.race([
          scrapeProductViaAPI(currentProduct.url),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Scraping timeout')), 15000)
          )
        ]) as any;

        if (!scrapedProduct) {
          console.log('⚠️  No data scraped, skipping...');
          failCount++;
          continue;
        }

        // Update price history
        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
            date: new Date()
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory) || scrapedProduct.currentPrice,
          highestPrice: getHighestPrice(updatedPriceHistory) || scrapedProduct.currentPrice,
          averagePrice: getAveragePrice(updatedPriceHistory) || scrapedProduct.currentPrice,
        };

        // Update product in database
        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product,
          { new: true }
        );

        console.log(`✅ Updated: ${updatedProduct.title.substring(0, 50)}...`);
        console.log(`   Current Price: $${scrapedProduct.currentPrice}`);
        console.log(`   Lowest Price: $${product.lowestPrice}`);

        successCount++;

        // Check if notification should be sent
        const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

        if (emailNotifType && updatedProduct.users.length > 0) {
          console.log(`📧 Sending ${emailNotifType} notification to ${updatedProduct.users.length} users`);

          // Create proper productInfo object
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
            image: updatedProduct.image,
            currentPrice: updatedProduct.currentPrice,
            originalPrice: updatedProduct.originalPrice,
            currency: updatedProduct.currency,
          };

          try {
            const emailContent = generateEmailBody(productInfo, emailNotifType);
            const userEmails = updatedProduct.users.map((user: any) => user.email);
            await sendEmail(emailContent, userEmails);
            
            notificationCount++;
            console.log(`✉️  Notifications sent successfully`);
          } catch (emailError) {
            console.error('❌ Failed to send email:', emailError);
          }
        }

        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

      } catch (error: any) {
        console.error(`❌ Error updating product ${currentProduct._id}:`, error.message);
        failCount++;
      }
    }

    console.log('\n📊 Cron Job Summary:');
    console.log(`   ✅ Successful updates: ${successCount}`);
    console.log(`   ❌ Failed updates: ${failCount}`);
    console.log(`   📧 Notifications sent: ${notificationCount}`);
    console.log(`   ⏱️  Completed at: ${new Date().toISOString()}\n`);

  } catch (error: any) {
    console.error('❌ Cron job error:', error.message);
  } finally {
    isRunning = false;
  }
}

// For Development: Use setInterval instead of node-cron
let cronInterval: NodeJS.Timeout | null = null;

export function startPriceUpdateCron() {
  // Run every hour for development (or adjust as needed)
  const intervalMs = 60 * 60 * 1000; // 1 hour in milliseconds
  
  console.log('⏰ Starting price update interval...');
  console.log(`📅 Schedule: Every ${intervalMs / 1000 / 60} minutes`);
  
  // Run immediately once
  updateAllProducts();
  
  // Then run at the specified interval
  cronInterval = setInterval(() => {
    console.log('🔄 Interval triggered at:', new Date().toISOString());
    updateAllProducts();
  }, intervalMs);
  
  return cronInterval;
}

export function stopPriceUpdateCron() {
  if (cronInterval) {
    clearInterval(cronInterval);
    cronInterval = null;
    console.log('🛑 Cron interval stopped');
  }
}

// Manual trigger (for testing)
export async function triggerManualUpdate() {
  console.log('🔧 Manual update triggered');
  await updateAllProducts();
}