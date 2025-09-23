import React from 'react'
import { Search, Film, Clapperboard } from "lucide-react";
import Link from 'next/link';

const navbar = () => {
  return (
    <div className='Navbar z-10 fixed bg-white  h-15  w-full flb gap-55  text-black'>
      <div className="logo  fl flex-1/4 gap-3 cp">
        <div className="logo-image ">
          <Clapperboard />
        </div>
        <Link href={"/"}>
          <div className="logo-name ">What to Watch Next</div>
        </Link>
      </div>
      <div className="flb  flex-1/4">
        <div className='cp options-rotators'>Movies</div>
        <div className='cp options-rotators'>TV Shows</div>
        <div className='cp options-rotators'>About</div>
      </div>
      <Link href={"/search"}>
        <div className="search-nav  fl gap-3  flex-1/5">

          <div className="s-left fl gap-3 cp">
            <div className="search-icon fl translate-x-19 ">
              <Search />
            </div>
            <div className="search-text translate-y-5 ">
              Search A Movie
            </div>
          </div>
          <div className="search-block  z-10 relative h-4 -translate-x-32 translate-y-5 w-30  bg-white"></div>
        </div>
      </Link>
    </div>
  )
}

export default navbar
