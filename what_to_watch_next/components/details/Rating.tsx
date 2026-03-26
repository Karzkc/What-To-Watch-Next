"use client"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { useAuth } from "../providers/AuthProvider"
import { useRouter } from "next/navigation"

const LABELS: Record<number, string> = {
  1: "Terrible",
  2: "Meh",
  3: "Decent",
  4: "Great",
  5: "Masterpiece",
}

interface RatingProps {
  tmdbId: string
  mediaType: "movie" | "tv"
}

export default function Rating({ tmdbId, mediaType }: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(0)
  const ratingIdRef = useRef<string | null>(null) // ref avoids stale closure
  const [hovered, setHovered] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchRating = async () => {
      try {

        const res = await fetch("/api/rating")
        if (!res.ok) return
        const data = await res.json()
        const match = (data.ratings as any[])?.find(
          (r) => Number(r.tmdbId) === Number(tmdbId) && r.mediaType === mediaType
        )
        if (match) {
          setCurrentRating(match.rating)
          ratingIdRef.current = match._id
        }
      } catch {
        toast.error("Failed to update rating")
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchRating()
  }, [tmdbId, mediaType])

  // const flashMessage = (msg: string) => {
  //   setMessage(msg)
  //   setTimeout(() => setMessage(null), 2000)
  // }

  const handleRate = async (star: number) => {
    if (!user) {
      router.push("/login")
      toast.warning("Login to use these features!")
      return
    }
    if (submitting) return

    // Always read from ref — never stale, unlike state inside a closure
    const currentId = ratingIdRef.current

    // Clicking same star = delete
    if (star === currentRating && currentId) {
      setSubmitting(true)
      try {
        const res = await fetch(`/api/rating/${currentId}`, { method: "DELETE" })
        if (res.ok) {
          setCurrentRating(0)
          ratingIdRef.current = null
          toast.warning("Rating removed")
        }
      } finally {
        setSubmitting(false)
      }
      return
    }

    setSubmitting(true)
    try {
      if (currentId) {
        // PATCH existing rating
        const res = await fetch(`/api/rating/${currentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: star }),
        })
        if (res.ok) {
          setCurrentRating(star)
          toast.success("Rating updated!")
        }
      } else {
        // POST new rating
        const res = await fetch("/api/rating", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId: Number(tmdbId), mediaType, rating: star }),
        })
        if (res.ok) {
          const data = await res.json()
          setCurrentRating(star)
          ratingIdRef.current = data.rating._id // store in ref immediately
          toast.success("Rating saved!")
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  const display = hovered || currentRating

  return (
    <div className="mt-4 select-none">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-forum">
        Your Rating
      </p>

      {loading ? (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-7 h-7 rounded bg-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= display
            return (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                disabled={submitting}
                aria-label={`Rate ${star} out of 5`}
                className={`
                  relative text-2xl transition-all duration-150 ease-out
                  disabled:cursor-not-allowed
                  ${filled
                    ? "text-amber-400 scale-110"
                    : "text-gray-600 hover:text-amber-300"
                  }
                  hover:scale-125 active:scale-95
                `}
                style={{
                  transitionDelay: `${(star - 1) * 20}ms`,
                  filter: filled
                    ? "drop-shadow(0 0 4px rgba(251,191,36,0.5))"
                    : undefined,
                }}
              >
                ★
              </button>
            )
          })}

          <span
            className={`
              ml-3 text-sm font-cormorant italic transition-all duration-200
              ${hovered
                ? "text-amber-300 opacity-100 translate-x-0"
                : currentRating
                  ? "text-gray-300 opacity-80"
                  : "opacity-0 -translate-x-2"
              }
            `}
          >
            {LABELS[display] ?? ""}
          </span>
        </div>
      )}

      <div
        className={`
          mt-1 text-xs font-forum text-emerald-400 transition-all duration-300
          ${message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
        `}
      >
        {message ?? "\u00A0"}
      </div>
    </div>
  )
}