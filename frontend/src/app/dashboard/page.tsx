'use client'

import { redirect } from "next/navigation"
import { useUser } from "../context/UserProvider"

export default function Dashboard() {
    const { user } = useUser()

    if (!user) {
        redirect('/auth/login')
    }

    return (
        <div>
            {user && <>
                <h1> Welcome {user.username}</h1>
                <p>Email: <code>{user.email}</code> </p>
            </>
            }
        </div>
    )
}