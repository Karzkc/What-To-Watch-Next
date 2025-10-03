import React from 'react'
import { Search, Clapperboard } from "lucide-react";
import Link from 'next/link';

const navbar = () => {
  return (
    <div className='Navbar h-15  w-full flb gap-55 z-100 fixed px-5 
    bg-gradient-to-b from-purple-100/30 via-purple-200/30 to-purple-300/30  backdrop-blur-3xl  text-white  font-[500] font-josefin'>
      
      <div className="logo  fl flex-1/4 gap-3 cp">
        <div className="logo-image ">
          <Clapperboard />
        </div>
        <Link href={"/"}>
          <div className="logo-name font-cinzel tracking-wide ">What to Watch Next</div>
        </Link>
      </div>
      <div className="flb  flex-1/4">
        <Link href={'/movies'}><div className='cp options-rotators'>Movies</div></Link>
        <Link href={'/shows'}><div className='cp options-rotators'>TV Shows</div></Link>
        <Link href={'/about'}><div className='cp options-rotators'>About</div></Link>
        
      </div>
      <Link href={"/search"}>
        <div className="search-nav group  w-80 flex items-center gap-2 px-3 py-2 rounded-md bg-transparent overflow-hidden">
          <div className="search-icon transition-all translate-x-30 duration-300 group-hover:-translate-x-0">
            <Search />
          </div>
          <div className="search-text transform translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100">
            Search A Movie or Show
          </div>
        </div>

      </Link>
    </div>
  )
}

export default navbar
