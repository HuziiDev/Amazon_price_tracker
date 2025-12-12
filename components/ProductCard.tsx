'use client'
import React, { useState } from 'react'
import { Product } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Loader from './Loader'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setLoading(true)

    // your async logic here (if needed)
    setTimeout(() => {
      router.push(`/products/${product._id}`)
    }, 2000)
  }

  return (
    <div className="sm:w-[292px] sm:max-w-[292px] w-full flex-1 flex flex-col gap-4 rounded-md">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-white p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 p-2"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        <div className="absolute top-2 right-2">
          <span className="bg-primary text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
            HOT
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-secondary text-sm font-semibold line-clamp-2 mb-1.5 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="mb-2">
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">
            {product.category}
          </span>
        </div>

        {/* Price + Track */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-bold text-2xl">
              {product.currency}
            </span>
            <span className="text-secondary font-bold text-2xl">
              {product.currentPrice}
            </span>
          </div>

          {/* Button with loader */}
          <button
            onClick={handleClick}
            disabled={loading}
            className=" px-32 py-4 md:px-10 rounded-lg  bg-black text-white font-semibold hover:bg-gray-900/70 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader/>: 'Track'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
