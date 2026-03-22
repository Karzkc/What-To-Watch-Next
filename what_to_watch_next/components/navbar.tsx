"use client"

import { Search, Clapperboard } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import NavbarSkeleton from "./Navbar-skeleton"

const navbar = () => {
  const { user, loading, setUser } = useAuth()
  const router = useRouter()

  if (loading) return <NavbarSkeleton/>

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/")
  }

  const handleGuest = async () => {
    await fetch("/api/auth/guest", { method: "POST" })

    const res = await fetch("/api/auth/me", {
      credentials: "include"
    })
    const data = await res.json()

    setUser(data.user)
    router.push("/")
  }

  return (
    <div className="Navbar w-full fixed top-0 z-50 px-6 py-3 flb
    bg-gradient-to-b from-purple-100/30 via-purple-200/30 to-purple-300/30 
    backdrop-blur-3xl text-white font-[500] font-josefin">

     
      <div className="fl gap-3 cp whitespace-nowrap">
        <Clapperboard />
        <Link href="/">
          <div className="font-cinzel tracking-wide">
            What to Watch Next
          </div>
        </Link>
      </div>

      
      <div className="fl gap-8 whitespace-nowrap">
        <Link href="/movies"><div className="cp options-rotators">Movies</div></Link>
        <Link href="/shows"><div className="cp options-rotators">TV Shows</div></Link>
        <Link href="/about"><div className="cp options-rotators">About</div></Link>
      </div>

   
      <div className="fl gap-6 whitespace-nowrap">

        
        {user ? (
          <div className="fl gap-4">
            <div className="text-green-300">Hello {user.name}</div>

            <Link href="/watchlist">
              <div className="cp options-rotators">Watchlist</div>
            </Link>

            <div onClick={handleLogout} className="cp options-rotators text-red-400">
              Logout
            </div>
          </div>
        ) : (
          <div className="fl gap-4">
            <Link href="/login">
              <div className="cp options-rotators text-blue-300">Login</div>
            </Link>

            <Link href="/register">
              <div className="cp options-rotators text-blue-300">Register</div>
            </Link>

            <div onClick={handleGuest} className="cp options-rotators text-blue-300">
              Guest
            </div>
          </div>
        )}

        
        <Link href={"/search"}> 
        <div className="search-nav group flex items-center gap-2 px-3 py-2 rounded-md bg-transparent overflow-hidden"> 
          <div className="search-icon transition-all lg:translate-x-30 lg:duration-300 lg:group-hover:-translate-x-0"> <Search /> </div> <div className="search-text transform lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-1 lg:group-hover:opacity-100"> Search A Movie or Show </div> </div> </Link>

      </div>
    </div>
  )
}

export default navbar