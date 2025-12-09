
import Modal from '@/components/Modal'
import PriceInfoCard from '@/components/PriceInfoCard'
import ProductCard from '@/components/ProductCard'
import { getProductById, getSimilarProduct } from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { Product } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'



type Props = {
    params: Promise<{ id: string }> // params is a Promise in Next.js 14
}

const ProductDetails = async (props: Props) => {
    // Await the params Promise first
    const params = await props.params
    const { id } = params
    
   
    const { data: product } = await axios.get<Product>(`http://localhost:3001/api/product/${id}` )
    if(!product){
        redirect('/')
        return null;
    }
   const { data: similarproducts } = await axios.get<Product[]>(`http://localhost:3001/api/product/${id}/similar` )
   console.log(similarproducts)
    // const similarproducts = await getSimilarProduct(id)
    
    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 sm:py-12 lg:py-16' id="product-details">
            {/* Main Product Section */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12'>
                {/* Product Image */}
                <div className='w-full lg:w-1/2'>
                    <div className='bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow'>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={580}
                            height={400}
                            className='w-full h-auto object-contain'
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                    {/* Header */}
                    <div className='flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-gray-200'>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl text-secondary font-bold leading-tight'>
                            {product.title}
                        </h1>
                        <Link 
                            href={product.url}
                            target='_blank'
                            className='text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-4 transition-colors whitespace-nowrap'
                        >
                            Visit Product →
                        </Link>
                    </div>

                    {/* Engagement Metrics */}
                    <div className='flex items-center gap-3 flex-wrap'>
                        <div className='flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full shadow-sm'>
                            <Image src="/heart.png" alt='likes' width={20} height={20}/>
                            <p className='text-sm sm:text-base font-semibold text-red-500'>{product.reviewsCount}</p>
                        </div>
                        <button className='p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-sm'>
                            <Image src="/bookmark.png" alt='bookmark' width={20} height={20}/>
                        </button>
                        <button className='p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-sm'>
                            <Image src="/share.png" alt='share' width={20} height={20}/>
                        </button>
                    </div>

                    {/* Pricing Section */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-6 border-y-2 border-gray-200'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-3xl sm:text-4xl lg:text-5xl text-green-600 font-bold'>
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>
                            <p className='text-xl sm:text-2xl text-gray-400 line-through font-semibold'>
                                {product.currency} {formatNumber(product.originalPrice)}
                            </p>
                        </div>

                        <div className='flex flex-col gap-3 w-full sm:w-auto'>
                            <div className='flex gap-3 flex-wrap'>
                                <div className='flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full shadow-sm'>
                                    <Image src="/star.png" alt='rating' width={16} height={16}/>
                                    <p className='text-sm font-semibold text-orange-500'>{product.stars || 'N/A'}</p>
                                </div>
                                <div className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm'>
                                    <Image src="/comment.png" alt='reviews' width={16} height={16}/>
                                    <p className='text-sm text-gray-700 font-semibold'>{product.reviewsCount} Reviews</p>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600'>
                                <span className='font-bold text-green-600'>93%</span> of buyers have recommended this
                            </p>
                        </div>
                    </div>

                    {/* Price Info Cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                        <PriceInfoCard 
                            title="Current Price"
                            iconSrc="/price.png"
                            value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title="Average Price"
                            iconSrc="/price.png"
                            value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title="Highest Price"
                            iconSrc="/price.png"
                            value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title="Lowest Price"
                            iconSrc="/price.png"
                            value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                            borderColor="#b6dbff"
                        />
                    </div>
                </div>
                
            </div>
            <div className='flex justify-center items-center my-20'>
               <Modal productId={id}/>
            </div>
            
            {/* Product Description Section */}
            <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm mb-8'>
                <div className='flex flex-col gap-6'>
                    <h3 className='text-2xl sm:text-3xl text-gray-800 font-bold border-l-4 border-blue-500 pl-4'>
                        Product Description
                    </h3>
                   
                    {/* Buy Now Button */}
                    <button className='mt-6 w-full sm:w-auto self-start flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-900 hover:from-gray-950 hover:to-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                        <Image src="/buy.png" alt='buy now' width={24} height={24} className='brightness-0 invert'/>
                        <Link className='text-base sm:text-lg text-white font-semibold' href={product.url} target='_blank'>
                            Buy Now
                        </Link>
                    </button>
                </div>
            </div>
            
            {/* Similar Products Section */}
            {similarproducts && similarproducts.length > 0 && (
                <div className='py-8 sm:py-12'>
                    <div className='flex items-center gap-3 mb-8'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>Similar Products</h2>
                        <div className='h-1 flex-grow bg-gradient-to-r from-blue-500 to-transparent rounded'></div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'>
                        {similarproducts.map(product  => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails