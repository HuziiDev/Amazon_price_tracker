"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: 'https://gourban.in/cdn/shop/files/Pulse.jpg?v=1749553994&width=2048', alt: 'smartwatch'},
  { imgUrl: 'https://nestasia.in/cdn/shop/products/DSC_2822.jpg?v=1676634053g', alt: 'bag'},
  { imgUrl: 'https://m.media-amazon.com/images/I/71yozRRwveL._AC_UF1000,1000_QL80_.jpg', alt: 'lamp'},
  { imgUrl: 'https://assets.aboutamazon.com/dims4/default/d5d66f7/2147483647/strip/false/crop/1280x720+0+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F0d%2F66%2Fb8299ba442abaec89029edb72cc2%2Fbanner-air-fryer.jpg', alt: 'air fryer'},
  { imgUrl: 'https://m.media-amazon.com/images/I/817VI3DpflL._AC_UF894,1000_QL80_.jpg', alt: 'chair'},
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        infiniteLoop
        // interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image 
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image 
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  )
}

export default HeroCarousel