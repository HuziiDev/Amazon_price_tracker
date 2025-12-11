// app/api/startup/route.ts
// This route initializes the cron job when the app starts
import { startPriceUpdateCron } from '@/lib/cron/PriceUpdateCron';
import { NextResponse } from 'next/server';


let cronInitialized = false;

export async function GET() {
  if (!cronInitialized) {
    try {
      startPriceUpdateCron();
      cronInitialized = true;
      
      return NextResponse.json({
        success: true,
        message: 'Cron job initialized successfully'
      });
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        message: 'Failed to initialize cron job',
        error: error.message
      }, { status: 500 });
    }
  }

  return NextResponse.json({
    success: true,
    message: 'Cron job already running'
  });
}

// Alternative: Initialize in layout.tsx or a middleware
// This is better for production

// middleware.ts (Root of your project)
/*
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let cronStarted = false;

export function middleware(request: NextRequest) {
  if (!cronStarted && process.env.NODE_ENV === 'production') {
    // Dynamically import to avoid issues
    import('@/lib/cron/priceUpdateCron').then(({ startPriceUpdateCron }) => {
      startPriceUpdateCron();
      cronStarted = true;
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
*/