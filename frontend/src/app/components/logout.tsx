'use client'

import { useRouter } from "next/navigation"
import { useUser } from "../context/UserProvider"
import axios from "axios"
import { useEffect } from "react"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/logout/`

export default function Logout() {
    const { user, setUser } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!user || !user.username) {
            router.push('/auth/login')
        }
    }, [user, router])

    async function handleLogout() {
        const token = localStorage.getItem('refresh')
        try {
            const res = await axios.post(
                baseUrl,
                {"refresh":token},
                { withCredentials: true }
            )
            if (res) {
                setUser({ id: "", username: "", email: "" })
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
            }
            router.push('/')
        } catch (err) {
            alert("Logout failed " + err)
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
