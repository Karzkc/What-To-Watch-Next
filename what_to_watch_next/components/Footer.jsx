import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="
      footer w-full h-18 z-100 bottom-0 
     bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 p-4 shadow-lg backdrop-blur-3xl   text-white
      flex items-center justify-center
    ">
            <span className="fl flex-col gap-2  font-[600]">

                <span className='flb gap-2 font-playfair'>
                    Made with ❤️ by Kartik
                    <Link
                        href="https://github.com/karzkc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        aria-label="GitHub"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M12 0.297C5.372 0.297 0 5.669 0 12.297c0 5.293 3.438 9.774 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.043-3.338.726-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.086 1.839 1.238 1.839 1.238 1.07 1.834 2.808 1.304 3.495.997.108-.775.418-1.305.761-1.606-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.007-.404c1.02.004 2.045.138 3.005.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.872.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.37.813 1.099.813 2.219 0 1.602-.015 2.893-.015 3.287 0 .32.216.694.825.576C20.565 22.067 24 17.589 24 12.297 24 5.669 18.627 0.297 12 0.297z"
                            />
                        </svg>
                    </Link>
                </span>
                <span className='font-cormorant'>
                    {new Date().getFullYear()} ©&nbsp;|&nbsp; All rights reserved
                </span>
            </span>
        </div>
    )
}

export default Footer
