"use client"
import { useEffect, useState } from "react";
import Poster from "./components/Home/Poster";
import Recommended from "./components/Home/Recommended";



export default function Home() {
  return (
    <>
      <div className="main">
        <div className="pt-15">

        <Poster />
        </div>
        <Recommended />
      </div>
    </>
  )
}