"use client";

import * as React from "react";
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Options } from "./Options";
import { Movie } from "@/app/types/movie";
import Image from "next/image";

interface SliderProps {
  params?: string;
  options?: boolean;
  todayData?: Movie[];
  weekData?: Movie[];
  mediaType?: "movie" | "tv";
}

const Slider = ({ params, options, todayData, weekData, mediaType }: SliderProps) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<"today" | "week">("today");
  const currentData = selectedPeriod === "today" ? todayData : weekData;

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 flex flex-col">
      <div className="upper-categ self-start flex items-center justify-between w-full px-5 mb-10 gap-5">
        <div className="Category text-2xl font-semibold text-white font-forum">
          {params}
        </div>
        <div className="options">
          {options ? (
            <Options
              params="Today"
              label="Sort By"
              values={["Today", "This Week"]}
              onValueChange={(value: string) => {
                setSelectedPeriod(value === "Today" ? "today" : "week");
              }}
            />
          ) : ""}
        </div>
      </div>

      <div className="mt-5 w-full  ">
        {/* mobi;e view */}
          
        <div className="lg:hidden overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-900 [&::-webkit-scrollbar-track]:bg-gray-900">
          <div className="flex space-x-4">

            {currentData && currentData.map((item) => (
              <Link href={`/details/${mediaType}/${item.id}`} key={item.id}>

                <div className="flex-shrink-0 w-40">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={"Poster"}
                    width={246}
                    height={369}
                    className="rounded-lg w-full h-auto object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* pc view */}
        <Carousel opts={{ align: "start", loop: false }} className="hidden lg:flex ">
          <CarouselContent className="-ml-4">
            {currentData && currentData.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Link href={`/details/${mediaType}/${item.id}`}>
                  <div className="p-1">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={"Poster"}
                      width={246}
                      height={369}
                      className="rounded-lg shadow-md w-full h-auto object-cover transition-transform hover:scale-105"
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
    </div>
  );
};

export default Slider;