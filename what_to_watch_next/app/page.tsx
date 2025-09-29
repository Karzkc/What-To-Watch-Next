"use client"
import { useEffect, useState } from "react";
import Poster from "../components/Home/HeroBanner";
import Recommended from "../components/Home/Recommended";
import Image from "next/image";
Image



export default function Home() {
  return (
    <>
      <div className="main">
        
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