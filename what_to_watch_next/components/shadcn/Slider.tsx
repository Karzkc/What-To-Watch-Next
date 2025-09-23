"use client";

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Options } from "./Options";


const Slider = ({ params, options }: any) => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12 fl flex-col ">

      <div className="upper-categ self-start flex flex-col ml-5">

        <div className="Category mb-4 text-xl 
        font-semibold text-white ">
          {params}
        </div>
        <div className="options ">
          {options ? <Options params="Top" label="Sort By" values={["Today","This Week","This Month"]} /> : ""}
        </div>
      </div>
      <div className="categ flex justify-between flex-col gap-10 mt-5 w-full">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-4">
                  <div className="flex items-center justify-center h-40 
                  bg-purple-900/40 text-white rounded-lg shadow-md ">
                    Item {index + 1}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>

  )
}

export default Slider
