// app/api/cron/route.ts
import { updateAllProducts } from '@/lib/cron/PriceUpdateCron';
import { NextRequest, NextResponse } from 'next/server';


export const maxDuration = 300; // 5 minutes max
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Optional: Add authentication
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔧 Manual cron trigger via API');
    
    // Run the update
    await updateAllProducts();

    return NextResponse.json({
      success: true,
      message: 'Price update completed',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Cron API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update products',
        error: error.message
      },
      { status: 500 }
    );
  }
}