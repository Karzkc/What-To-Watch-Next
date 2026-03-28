"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const gradients = [
    "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]",
    "bg-gradient-to-br from-[#020024] via-[#090979] to-[#000000]",
    "bg-gradient-to-br from-[#021c1e] via-[#0b3c5d] to-[#1d2d50]",
    "bg-gradient-to-br from-[#0b0b0f] via-[#2b0f3a] to-[#4c1d95]",
    "bg-gradient-to-br from-[#140a1f] via-[#2d1b4e] to-[#1e1b4b]",
    "bg-gradient-to-br from-[#0a0a0a] via-[#2a2a1a] to-[#1a1a0f]",
    "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]",
    "bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a]",
    "bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a]",
    "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"
]

export default function WatchlistPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [watchlist, setWatchlist] = useState<any[]>([])
    const [pageLoading, setPageLoading] = useState(true)
    const [bg] = useState(
        gradients[Math.floor(Math.random() * gradients.length)]
    )

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading])

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const res = await fetch("/api/watchlist", {
                    credentials: "include"
                })
                const data = await res.json()
                setWatchlist(data.watchlist || [])
            } catch (err) {
                console.error(err)
            } finally {
                setPageLoading(false)
            }
        }

        if (user) fetchWatchlist()
    }, [user])

    const handleRemove = async (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            await fetch(`/api/watchlist/${id}`, {
                method: "DELETE"
            })

            setWatchlist((prev) => prev.filter((item) => item._id !== id))
            toast.warning("Removed from Watchlist!")
        } catch (err) {
            console.error(err)
            toast.error("Failed to remove item")
        }
    }

    const handleStatusChange = async (
        e: React.MouseEvent,
        id: string,
        status: string
    ) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            const res = await fetch(`/api/watchlist/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            })

            const data = await res.json()

            setWatchlist((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, status: data.updatedItem.status } : item
                )
            )
            toast.info(`Changed status to ${status}`)
        } catch (err) {
            console.error(err)
        }
    }

    if (pageLoading) {
        return (
            <div className={`min-h-screen ${bg} pt-24 px-6`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 rounded-xl bg-white/10 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (watchlist.length === 0) {
        return (
            <div className={`min-h-screen ${bg} pt-24 px-6 text-white`}>
                <h1 className="text-2xl font-cinzel">Your watchlist is empty</h1>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${bg} text-white pt-48 lg:pt-24 px-4 sm:px-6 lg:px-10 pb-20`}>

           
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 font-cinzel 
                    bg-white/10 rounded-md mx-auto w-max px-20 py-3 flb">
                My Watchlist
            </h1>

           
            <div className="grid p-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">

                {watchlist.map((item) => (
                    <div
                        key={item._id}
                        onClick={() => router.push(`/details/${item.mediaType}/${item.tmdbId}`)}
                        className="group block rounded-xl overflow-hidden cursor-pointer
                        bg-white/5 backdrop-blur-lg border border-white/10
                        hover:scale-[1.03] transition-all duration-300"
                    >

                        {/* poster img */}
                        <div className="w-full aspect-[2/3] bg-white/10">
                            {item.posterPath ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* bottom */}
                        <div className="p-1 sm:p-3 bg-gradient-to-b from-transparent to-black/40">

                            
                            <h2 className="text-[10px] sm:text-xs lg:text-sm font-medium line-clamp-2 font-playfair">
                                {item.title || "Unknown"}
                            </h2>

                           
                            <div className="flex flex-wrap justify-between items-center mt-2 gap-1">

                             
                                <div className="flex gap-1 items-center flex-wrap">

                                    {/* select opt */}
                                    <Select
                                        value={item.status}
                                        onValueChange={(value) =>
                                            handleStatusChange(
                                                { preventDefault: () => { }, stopPropagation: () => { } } as any,
                                                item._id,
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-5 sm:h-7 py-0 px-2 text-[8px] sm:text-[11px] rounded-full
                                            bg-purple-500/20 text-purple-300
                                            border border-purple-400/20
                                            flex items-center gap-1
                                            [&>svg]:w-3 [&>svg]:h-3
                                            whitespace-nowrap
                                            focus:ring-0 focus:outline-none"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
                                            <SelectItem value="planned">Planned</SelectItem>
                                            <SelectItem value="watching">Watching</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    
                                    <span className="text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full 
    bg-blue-500/20 text-blue-300 capitalize whitespace-nowrap">
                                        {item.mediaType}
                                    </span>
                                </div>

                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(e, item._id)
                                    }}
                                    className="text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full 
    bg-red-500/20 text-red-300 hover:bg-red-500/30 transition whitespace-nowrap"
                                >
                                    Remove
                                </button>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}