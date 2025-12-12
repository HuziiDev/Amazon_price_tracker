'use client'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/product')
        setAllProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array - runs only once

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (allProducts.length === 0) {
    return (
       <div className="text-center text-gray-500 py-10">
        No products available yet. Start tracking some products!
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
      {allProducts.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default AllProducts