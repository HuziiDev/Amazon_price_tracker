'use server'

import { connect } from "http2";
import Product from "../models/product.model";
import { conenctToDb } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { Sen } from "next/font/google";
export async function scrapeAndStoreProduct(productUrl: string){
    //function to scrape and store product details from amazon link
    if(!productUrl){
       return
    }

    try {
        conenctToDb()
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
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

       revalidatePath(`/products/${newProduct?._id}`);
    } catch (error:any) {
        throw new Error(`Falied to scrape the product: ${error.message}`)
    }
}


export async function getProductById(productId: string){
    try {
      conenctToDb()
        const product = await Product.findOne({_id: productId});
        if(!product){
            throw new Error('Product not found');
        }
        return product;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch product');
    }
}
export async function getAllProduct(){
    try {
      conenctToDb()
        const product = await Product.find();
        
        return product;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch products');
    }
}

export async function getSimilarProduct(productId: string){
    try {
      conenctToDb()
       const currentProduct = await Product.findById(productId);
        if(!currentProduct){
            throw new Error('Product not found');
        }
        const similarProducts = await Product.find({
       
            _id: { $ne: productId }
        }).limit(3);
      
        return similarProducts;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch product');
    }
}


export async function addUserEmailToProduct(userEmail: string, productId: string){

     try {
        //send our first email...
        const product = await Product.findById(productId);

        if(!product){
            throw new Error('Product not found');
        }

        const userExists = product.users.some((user:User) => user.email === userEmail);

        if(!userExists){
            product.users.push({email: userEmail});
            await product.save();
            const emailContent = generateEmailBody(product,'WELCOME');
            await sendEmail(emailContent, [userEmail])
        }
     } catch (error) {
        
     }
}