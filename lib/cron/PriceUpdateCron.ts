// lib/cron/priceUpdateCron.ts
import cron from 'node-cron';
import Product from '@/lib/models/product.model';
import { conenctToDb } from '@/lib/mongoose';
import { scrapeAmazonProduct } from '@/lib/scraper';
import { 
  getAveragePrice, 
  getHighestPrice, 
  getLowestPrice, 
  getEmailNotifType 
} from '@/lib/utils';
import { generateEmailBody, sendEmail } from '@/lib/nodemailer';

// Track if cron is running
let isRunning = false;

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
        console.log(`\n🔍 Scraping: ${currentProduct.title.substring(0, 50)}...`);

        // Scrape with timeout
        const scrapedProduct = await Promise.race([
          scrapeAmazonProduct(currentProduct.url),
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

          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          try {
            const emailContent = await generateEmailBody(productInfo, emailNotifType);
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

// Initialize cron job
export function startPriceUpdateCron() {
  // Run every 24 hours at 2:00 AM
  // Cron format: second minute hour day month weekday
  // '0 0 2 * * *' = Every day at 2:00 AM
  
  const cronSchedule = '15 19 * * *'; 
  // Other schedule options:
  // '0 */6 * * *' - Every 6 hours
  // '0 0 */12 * * *' - Every 12 hours
  // '0 0 0 * * 0' - Every Sunday at midnight
  // '0 30 1 * * *' - Every day at 1:30 AM

  console.log('⏰ Initializing price update cron job...');
  console.log(`📅 Schedule: Daily at 2:00 AM`);

  const task = cron.schedule(cronSchedule, async () => {
    await updateAllProducts();
  }, {
    scheduled: true,
    timezone: "America/New_York" // Change to your timezone
  });

  console.log('✅ Cron job started successfully!');

  return task;
}

// Stop cron job
export function stopPriceUpdateCron(task: cron.ScheduledTask) {
  if (task) {
    task.stop();
    console.log('🛑 Cron job stopped');
  }
}

// Manual trigger (for testing)
export async function triggerManualUpdate() {
  console.log('🔧 Manual update triggered');
  await updateAllProducts();
}