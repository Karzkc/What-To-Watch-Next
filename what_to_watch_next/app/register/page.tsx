"use client"

import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const page = () => {

  const router = useRouter()
  const { setUser } = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  // bg gradient
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
  const [bg] = useState(
    gradients[Math.floor(Math.random() * gradients.length)]

  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" })
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })

      })

      const data = await res.json()
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors)
        }
        else {
          setErrors({ general: data.error })
        }
        return
      }

      const userRes = await fetch("/api/auth/me")
      const userData = await userRes.json()
      setUser(userData.user)
      router.push("/")
      toast.success(`Successfully signed in as ${userData.user.name}!`)


    } catch {
      toast.error("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = async () => {
    await fetch("/api/auth/guest", { method: "POST" })
    const res = await fetch("/api/auth/me")
    const data = await res.json()
    setUser(data.user)
    router.push("/")
    toast.info("Signed in as guest!")
  }



  return (
    <div className={`min-h-svh pt-[100px] flex justify-center items-center text-white ${bg}`}>

      <form
        onSubmit={handleSubmit}
        className="w-[380px] p-8 border rounded-xl backdrop-blur bg-white/10 shadow-lg border-white/20"
      >


        <div className="text-center mb-6">
          <div className="text-3xl font-playfair tracking-wide">
            Register
          </div>
          <div className="text-sm text-white/70 font-josefin">
            Create your account
          </div>
        </div>


        {errors.general && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {errors.general}
          </p>
        )}

        <div className="flex flex-col gap-4">


          <div>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none font-josefin"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>


          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none font-josefin"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>


          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none font-josefin"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>


          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none font-josefin"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>


          <button
            disabled={loading}
            className="mt-2 py-2 rounded-md bg-purple-500 hover:bg-purple-600 transition-all font-josefin  cp disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </div>


        <div className="flex items-center gap-3 my-6 text-white/50 text-sm font-josefin">
          <div className="flex-1 h-[1px] bg-white/20"></div>
          or
          <div className="flex-1 h-[1px] bg-white/20"></div>
        </div>


        <button
          type="button"
          onClick={handleGuest}
          className="w-full py-2 rounded-md border border-white/20 hover:bg-white/10 transition-all font-josefin cp"
        >
          Continue as Guest
        </button>


        <div className="text-center mt-6 text-sm text-white/70 font-josefin">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-300 hover:underline cp"
          >
            Login
          </span>
        </div>

      </form>
    </div>
  )
}

export default page
