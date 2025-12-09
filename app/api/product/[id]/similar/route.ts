import Product from "@/lib/models/product.model";
import { conenctToDb } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is a Promise
) {
  try {
    await conenctToDb();
    
    // Await params before accessing id
    const { id } = await params;
      const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
     const similarProducts = await Product.find({
      _id: { $ne: id }, // exclude current product
      category: product.category, // same category
    }).limit(4);

    return NextResponse.json(similarProducts, { status: 200 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}