import { NextRequest, NextResponse } from 'next/server';


import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { User } from '@/types';
import { conenctToDb } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';

export async function POST(req: NextRequest) {
  try {
    const { userEmail, productId } = await req.json();

    if (!userEmail || !productId) {
      return NextResponse.json(
        { success: false, message: 'Email and product ID are required' },
        { status: 400 }
      );
    }

    await conenctToDb();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (userExists) {
      return NextResponse.json({
        success: true,
        message: 'Already subscribed to this product'
      });
    }

    // Add user email
    product.users.push({ email: userEmail });
    await product.save();

    // Send welcome email
    const emailContent = generateEmailBody(product, 'WELCOME');
    await sendEmail(emailContent, [userEmail]);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to product updates'
    });

  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, message: `Failed to subscribe: ${error.message}` },
      { status: 500 }
    );
  }
}