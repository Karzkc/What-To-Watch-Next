"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type User = {
    id: string
    name: string
    role: string
}

type AuthContextType = {
    user: User | null
    loading: boolean
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authFetch = async () => {
            const authAPI = await fetch("/api/auth/me",{
                credentials:"include"
            })
            if (authAPI.ok) {
                const data = await authAPI.json()
                setUser(data.user)
            } else {
                setUser(null)
            }
            setLoading(false)
        }
        authFetch()
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("AuthProvider Error!")
    return context
}
