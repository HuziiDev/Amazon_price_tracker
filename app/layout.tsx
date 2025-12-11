import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PriceSync',
  description: 'Your deal unlocker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=' bg-black mx-auto'>
          <Navbar/>
          <Toaster position="top-center"/>
                    {children}
        </main>
     
        </body>
    </html>
  )
}
