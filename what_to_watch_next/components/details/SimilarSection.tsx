"use client"

import Link from "next/link"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface SimilarItem {
  id: number
  poster_path: string
  title?: string
  name?: string
}

export default function SimilarSlider({
  data,
  mediaType
}: {
  data: SimilarItem[]
  mediaType: string
}) {
  if (!data || data.length === 0) return null

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 flex flex-col">
      
     
      <div className="px-5 mb-6">
        <h2 className="text-xl font-cinzel text-white">
          More Like This
        </h2>
      </div>

     
      <div className="lg:hidden overflow-x-auto pb-4 
      [&::-webkit-scrollbar]:h-1.5 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      [&::-webkit-scrollbar-thumb]:bg-gray-600 
      [&::-webkit-scrollbar-track]:bg-gray-900">

        <div className="flex space-x-4 px-5">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/details/${mediaType}/${item.id}`}
            >
              <div className="flex-shrink-0 w-40">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="Image not Available"
                  width={246}
                  height={369}
                  className="rounded-lg w-full h-auto object-cover 
                  transition-transform hover:scale-105 font-cinzel"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

    
      <Carousel
        opts={{ align: "start", loop: false }}
        className="hidden lg:flex px-5"
      >
        <CarouselContent className="-ml-4">
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Link href={`/details/${mediaType}/${item.id}`}>
                <div className="p-1">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt="Image not Available"
                    width={246}
                    height={369}
                    className="similar-img rounded-lg shadow-md w-full h-auto object-cover 
                    transition-transform hover:scale-105 alt"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}