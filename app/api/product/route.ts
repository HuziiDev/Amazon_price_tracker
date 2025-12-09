import Product from "@/lib/models/product.model";
import { conenctToDb } from "@/lib/mongoose";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
   await conenctToDb()  // <-- important

    const products = await Product.find();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

