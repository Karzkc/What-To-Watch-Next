import React from 'react'
import { Search, Film, Clapperboard } from "lucide-react";
import Link from 'next/link';

const navbar = () => {
  return (
    <div className='Navbar h-15  w-full flb gap-55 z-10 fixed px-5 
    bg-gradient-to-b from-purple-100 via-purple-200 to-purple-300  backdrop-blur-3xl  text-black'>
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
        <div className="search-nav group  w-80 flex items-center gap-2 px-3 py-2 rounded-md bg-transparent overflow-hidden">
          <div className="search-icon transition-all translate-x-30 duration-300 group-hover:-translate-x-0">
            <Search />
          </div>
          <div className="search-text transform translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Search A Movie or Show
          </div>
        </div>

      </Link>
    </div>
  )
}

export default navbar
