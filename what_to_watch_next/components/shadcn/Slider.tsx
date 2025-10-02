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

interface SliderProps {
  params: string;
  options: boolean;
  todayData: Movie[];
  weekData: Movie[];
  mediaType: "movie" | "tv";
}

const Slider = ({ params, options, todayData, weekData, mediaType }: SliderProps) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<"today" | "week">("today");
  
  const currentData = selectedPeriod === "today" ? todayData : weekData;

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 flex flex-col">
      <div className="upper-categ self-start flex flex-col ml-5 backdrop-blur-3xl p-5 rounded-xl bg-white/20 ">
        <div className="Category mb-4 text-xl font-semibold text-black font-forum">
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
      <div className="categ flex justify-between flex-col gap-10 mt-5 w-full">
        <Carousel opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {currentData.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Link href={`details/${mediaType}/${item.id}`}>
                  <div className="p-1">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      className="rounded-lg shadow-md w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
