
import React from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import Product from '@/lib/models/product.model'


const AllProducts = async() => {
      const allProducts = await Product.find({})
      const plainProduct = JSON.parse(JSON.stringify(allProducts))
      console.log(plainProduct)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {plainProduct.map((product:any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
  )
}

export default AllProducts