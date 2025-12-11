'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const isValidAmazonProductURL = (url: string) => {
    try {
        const paresedURL = new URL(url);
        const hostname = paresedURL.hostname
        if (hostname.includes('amazon.')) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

const SearchBar = () => {
    const router = useRouter()
  
    const [SearchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)

        const isValidLink = isValidAmazonProductURL(SearchPrompt)
        if (!isValidLink) {
            alert('Please enter a valid Amazon product link');
            return;
        }

        try {
            const res = await axios.post('/api/product/scrape' ,
             {    productUrl:SearchPrompt}
            )
            const data = res.data
         console.log(data)
            setIsLoading(false);
        //   const res = await scrapeAndStoreProduct(SearchPrompt);
          
         if (data.success ) {
      toast.success("Product added!");
      router.push(`/products/${data.id}`);
    } else {
      toast.error(data.message || "Something went wrong");
    }
        } catch (error) {
            console.log('Error processing the link', error);
        } finally {
            setIsLoading(false)
        }
    }

  

    return (
        <form onSubmit={handleSubmit} className='relative mt-8 w-full max-w-3xl group'>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-200 to-red-100 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <input
                className='relative w-full py-5 pl-8 pr-32 text-gray-700 bg-slate-300 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-xl shadow-red-500/5 placeholder:text-black/80 placeholder:font-semibold text-lg transition-all duration-300'
                type="text"
                placeholder='Paste Amazon Product Link...'
                value={SearchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
            />

            <button
                className='absolute right-2 top-2 bottom-2 w-28 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed'
                type='submit'
                disabled={SearchPrompt === ''}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <span className="flex items-center gap-2">
                        Track
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                )}
            </button>
        </form>
    )
}

export default SearchBar
