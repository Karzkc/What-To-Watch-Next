"use client"

import * as React from "react"
import Slider from "../shadcn/Slider"
import { Options } from "../shadcn/Options"



const Recommended = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Slider params="Trending" options="true" />
      

    </div>
  )
}

export default Recommended
