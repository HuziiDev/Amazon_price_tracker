
import React from 'react'
import { Product } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link 
            href={`/products/${product._id}`}
            className="sm:w-[292px] sm:max-w-[292px] w-full flex-1 flex flex-col gap-4 rounded-md "
        >
            {/* Image Container - Smaller padding */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-white p-4">
                <Image 
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    priority={false}
                />
                
                {/* Small Hot Badge */}
                <div className="absolute top-2 right-2">
                    <span className="bg-primary text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                        HOT
                    </span>
                </div>
            </div>

            {/* Content Section - Smaller padding and tighter spacing */}
            <div className="p-3">
                {/* Title - Smaller font */}
                <h3 className="text-secondary text-sm font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1.5 min-h-[2.5rem]">
                    {product.title}
                </h3>

                {/* Category - Smaller */}
                <div className="mb-2">
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {product.category}
                    </span>
                </div>

                {/* Price Section - Tighter layout */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-1">
                        <span className="text-primary font-bold text-base">
                            {product?.currency}
                        </span>
                        <span className="text-secondary font-bold text-base">
                            {product.currentPrice.toFixed(2)}
                        </span>
                    </div>

                    {/* Smaller Arrow Button */}
                    <div className="bg-secondary hover:bg-primary text-white p-1.5 rounded-lg transition-colors duration-200">
                        <svg 
                            className="w-3.5 h-3.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard