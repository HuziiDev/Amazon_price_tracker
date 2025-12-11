// instrumentation.ts (Root of your project, same level as app/)
// This file runs once when the server starts

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only run on server, not in edge runtime
    const { startPriceUpdateCron } = await import('@/lib/cron/PriceUpdateCron');
    
    console.log('🚀 Server starting - Initializing cron jobs...');
    startPriceUpdateCron();
  }
}

// Add this to your next.config.js to enable instrumentation:
/*
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
  // ... other config
}
*/