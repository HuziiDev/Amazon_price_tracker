import { time } from 'console';
import mongoose from 'mongoose';
export interface IPriceHistory {
  price: number;
  date: Date;
}

export interface IProductUser {
  email: string;
}
export interface IProduct  {
  url: string;
  title: string;
  currency: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: IPriceHistory[];
  lowestPrice?: number;
  highestPrice?: number;
  averagePrice?: number;
  discountRate?: number;
  category?: string;
  reviewsCount?: number;
  isOutOfStock: boolean;
  users: IProductUser[];
  createdAt: Date;
  updatedAt: Date;
}
const productSchema = new mongoose.Schema<IProduct>({
    url:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true  
    },
    currency:{
        type: String,
        required: true  
    },
  
    image:{
        type: String,
        required: true
    },
      currentPrice:{
        type: Number,
        required: true  
    },
      originalPrice:{
        type: Number,
        required: true  
    },

    priceHistory:[
        {
            price:{
                type: Number,
                required: true  
            },
            date:{
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ],
    lowestPrice:{   
        type: Number,
 
    },
    highestPrice:{  
        type: Number,
 
    },
    averagePrice:{
        type: Number,

    },
    discountRate:{
        type: Number,
    },
  
    category:{
        type: String,
    },
    reviewsCount:{
        type: Number,
    },
    isOutOfStock:{
        type: Boolean,
        default: false
    },
    users:[
        {email:{type:String, required:true}}
    ],
    
}, {timestamps:true});
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;