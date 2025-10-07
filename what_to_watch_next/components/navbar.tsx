import React from 'react'
import { Search, Clapperboard } from "lucide-react";
import Link from 'next/link';

const navbar = () => {
  return (
    <div className='Navbar p-2.5 w-full flb gap-[20%] z-100 fixed flex-wrap px-5 
    bg-gradient-to-b from-purple-100/30 via-purple-200/30 to-purple-300/30  backdrop-blur-3xl text-white font-[500] font-josefin'>
      
      <div className="logo fl gap-3 cp">
        <div className="logo-image ">
          <Clapperboard />
        </div>
        <Link href={"/"}>
          <div className="logo-name font-cinzel tracking-wide ">What to Watch Next</div>
        </Link>
      </div>
      <div className="flb nav-links flex-1/4">
        <Link href={'/movies'}><div className='cp options-rotators'>Movies</div></Link>
        <Link href={'/shows'}><div className='cp options-rotators'>TV Shows</div></Link>
        <Link href={'/about'}><div className='cp options-rotators'>About</div></Link>
        
      </div>
      <Link href={"/search"}>
        <div className="search-nav group flex items-center gap-2 px-3 py-2 rounded-md bg-transparent overflow-hidden">
          <div className="search-icon transition-all lg:translate-x-30 lg:duration-300 lg:group-hover:-translate-x-0">
            <Search />
          </div>
          <div className="search-text transform lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-1 lg:group-hover:opacity-100">
            Search A Movie or Show
          </div>
        </div>

      </Link>
    </div>
  )
}

export default navbar