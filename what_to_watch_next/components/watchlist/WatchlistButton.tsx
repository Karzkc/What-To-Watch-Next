"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { Bookmark, Check } from "lucide-react"
import { toast } from "sonner"


export default function WatchlistButton({

    tmdbId,
    mediaType
}: {
    tmdbId: string
    mediaType: string
}) {
    const { user } = useAuth()
    const router = useRouter()

    const [watchlist, setWatchlist] = useState<{
        exists: boolean
        status?: string
        _id?: string
    } | null>(null)

    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch(`/api/watchlist/check/${tmdbId}`, {
                    credentials: "include"
                })
                const data = await res.json()
                setWatchlist(data)
            } catch (err) {
                console.error(err)
                toast.error("Failed to update watchlist")
            } finally {
                setLoading(false)
            }
        }

        check()
    }, [tmdbId])

    const handleAdd = async () => {
        if (!user) {
            router.push("/login")
            toast.warning("Login to use these features!")
            return
        }

        setBtnLoading(true)

        try {
            const res = await fetch("/api/watchlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    tmdbId,
                    mediaType,
                    status: "toWatch"
                })
            })

            const data = await res.json()

            setWatchlist({
                exists: true,
                status: data.status,
                _id: data._id
            })
            toast.success("Added to Watchlist")
        } catch (err) {
            console.error(err)
        } finally {
            setBtnLoading(false)
        }
    }

    
    const statusText =
        watchlist?.status === "planned"
            ? "Saved"
            : watchlist?.status === "watching"
                ? "Watching"
                : watchlist?.status === "completed"
                    ? "Watched"
                    : "In Watchlist"

    if (loading) {
        return (
            <div className="w-36 h-9 bg-white/10 animate-pulse rounded-full" />
        )
    }

    if (watchlist?.exists) {
        return (
            <button
                className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-full
                 bg-green-500/20 text-green-300 border border-green-400/30
                backdrop-blur-md cursor-default"
            >
                <Check size={16} />
                {statusText}
            </button>
        )
    }

    return (
        <button
            onClick={handleAdd}
            disabled={btnLoading}
            className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-full
            bg-gradient-to-r from-purple-500 to-indigo-500
            hover:from-purple-600 hover:to-indigo-600
            transition-all duration-200
            text-white shadow-md hover:shadow-lg
            disabled:opacity-60 cursor-pointer"
        >
            <Bookmark size={16} />
            {btnLoading ? "Adding..." : "Watchlist"}
        </button>
    )
}