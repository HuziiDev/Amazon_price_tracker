'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

 const isValidAmazonProductURL = (url: string) => {
    try {
        const paresedURL  = new URL(url);
        const hostname = paresedURL.hostname
        //check if hostnanme contains amazon domains
        if(hostname.includes('amazon.')){
            return true;
        }
    } catch (error) {
        return false;
    } 
 }

const SearchBar = () => {
    const [SearchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async(event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
 
         const isValidLink = isValidAmazonProductURL(SearchPrompt)
         if(!isValidLink){
            alert('Please enter a valid Amazon product link');
            return;
            }

            try {
                setIsLoading(true);
                //scrape 
                const product = await scrapeAndStoreProduct(SearchPrompt);
                  
            } catch (error) {
                console.log('Error processing the link', error);
            }finally{
                setIsLoading(false)
            }

    }
  return (
        <form onSubmit={handleSubmit} className='relative mt-12 max-w-2xl'>
                <input 
                    className='w-full py-3 pl-5 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 shadow-sm' 
                    type="text" 
                    placeholder='Enter the Amazon product Link' 
                    value={SearchPrompt}
                    onChange={(e) => setSearchPrompt(e.target.value)}
                />

                <button 
                    className='absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300' 
                    type='submit'
                    disabled={SearchPrompt === '' }
                >
                    {isLoading ? "..." :  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>}
                       
                </button>
        </form>
  )
}

export default SearchBar
