"use client"

import React from "react"
import { Search, Clapperboard } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const Navbar = () => {
  const { user, loading, setUser } = useAuth()
  const router = useRouter()

  if (loading) return null

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
      toast.warning("Logged out!")
      
    } catch (error) {
      toast.error("Logout Failed")
    }
  }

  const handleGuest = async () => {
    try {
      await fetch("/api/auth/guest", { method: "POST" })
  
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      })
      const data = await res.json()
  
      setUser(data.user)
      router.push("/")
      toast.info("Signed in as guest!")
      
    } catch (error) {
      toast.error("Guest login failed")
    }
  }

  return (
    <div
      className="Navbar w-full fixed top-0 z-50 px-4 py-3
      bg-gradient-to-b from-purple-100/30 via-purple-200/30 to-purple-300/30 
      backdrop-blur-3xl text-white font-[500] font-josefin

      flex flex-col gap-2
      lg:flex-row lg:items-center lg:justify-between"
    >
      {/* 🔹 LOGO */}
      <div className="flex items-center gap-3 justify-center lg:justify-start">
        <Clapperboard />
        <Link href="/">
          <div className="font-cinzel tracking-wide text-center lg:text-left">
            What to Watch Next
          </div>
        </Link>
      </div>

      {/* 🔹 NAV LINKS */}
      <div className="flex justify-center gap-6 text-md border-b border-white/10 pb-2 lg:border-none lg:pb-0">
        <Link href="/movies">
          <div className="cp options-rotators">Movies</div>
        </Link>
        <Link href="/shows">
          <div className="cp options-rotators">TV Shows</div>
        </Link>
        <Link href="/about">
          <div className="cp options-rotators">About</div>
        </Link>
      </div>

      {/* 🔹 USER + SEARCH */}
      <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end text-md">

        {/* USER */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-green-300 whitespace-nowrap">
              Hello {user.name}
            </div>

            <Link href="/watchlist">
              <div className="cp options-rotators">Watchlist</div>
            </Link>

            <div
              onClick={handleLogout}
              className="cp options-rotators text-red-400"
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <div className="cp options-rotators text-blue-300">
                Login
              </div>
            </Link>

            <Link href="/register">
              <div className="cp options-rotators text-blue-300">
                Register
              </div>
            </Link>

            <div
              onClick={handleGuest}
              className="cp options-rotators text-blue-300"
            >
              Guest
            </div>
          </div>
        )}

        {/* 🔍 SEARCH */}
        <Link href={"/search"}>
          <div className="search-nav group flex items-center gap-2 px-3 py-2 rounded-md bg-transparent overflow-hidden">
            <div className="search-icon transition-all lg:translate-x-30 lg:duration-300 lg:group-hover:-translate-x-0">
              <Search />
            </div>
            <div className="search-text transform lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-1 lg:group-hover:opacity-100 rounded-md
            bg-white/10 p-2">
              Search A Movie or Show
            </div>
          </div>

        </Link>
      </div>
    </div>
  )
}

export default Navbar