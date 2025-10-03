"use client"

import Poster from "../components/Home/HeroBanner";
import Recommended from "../components/Home/Recommended";
export default function Home() {
  return (
    <>
      <div className="main ">
        
        <div className="pt-15">
          <Poster />
        </div>

        <div className="">
          <Recommended />

        </div>


      </div>
    </>
  )
}