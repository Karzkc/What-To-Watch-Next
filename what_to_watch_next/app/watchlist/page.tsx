"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
        } catch (err) {
            console.error(err)
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
        <div className={`min-h-screen ${bg} text-white pt-24 px-10  overflow-y-auto`}>
            <h1 className="text-3xl font-semibold mb-8 font-cinzel">My Watchlist</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {watchlist.map((item) => (
                    console.log("ITEM FRONTEND:", item),
                    <Link
                        href={`/details/${item.mediaType}/${item.tmdbId}`}
                        key={item._id}
                        className="group block rounded-xl overflow-hidden
                        bg-white/5 backdrop-blur-lg border border-white/10
                       hover:scale-[1.04] transition-all duration-300"
                    >

                        <div className="w-full h-60 bg-white/10">
                            {item.posterPath ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>


                        <div className="p-3 bg-gradient-to-b from-transparent to-black/40">
                            <h2 className="text-sm font-medium line-clamp-2 font-playfair">
                                {item.title || "Unknown"}
                            </h2>


                            <div className="flex justify-between items-center mt-2 font-tenor">
                                <div className="fl gap-2">
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
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            className="h-7 px-3 text-[11px] rounded-full
                                         bg-purple-500/20 text-purple-300
                                            border border-purple-400/20
                                            hover:bg-purple-500/30
                                            transition-all duration-200
                                            flex items-center gap-1
                                            [&>svg]:w-3 [&>svg]:h-3 [&>svg]:opacity-70
                                            focus:ring-0 focus:outline-none cp"
                                        >
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>

                                        <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
                                            <SelectItem value="planned">Planned</SelectItem>
                                            <SelectItem value="watching">Watching</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-purple-300 capitalize">
                                        {item.mediaType}
                                    </span>
                                </div>

                                <button
                                    onClick={(e) => handleRemove(e, item._id)}
                                    className="text-[10px] px-2 py-1 rounded-full 
                                    bg-red-500/20 text-red-300 hover:bg-red-500/30 transition cursor-"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}