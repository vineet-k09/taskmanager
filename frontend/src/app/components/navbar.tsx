'use client'
import Link from "next/link"
import { useUser } from "../context/UserProvider"
import Logout from "./logout"

export default function Navbar() {
    const {user} = useUser()
    return (
        <nav className="border-b-1 flex justify-between items-center w-screen">
            <code className="text-3xl ml-3">
                Task Manager
            </code>
            <div className="flex gap-4 mr-3 items-center">
                <Link href="/" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Home</Link>
                <Link href="/#tasks" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Tasks</Link>
                {!user &&
                <Link href="/auth/register" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Register</Link>}
                {!user && <Link href="/auth/login" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Login</Link>}
                {user && <Link href="/dashboard" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Dashboard</Link>}
                <Link href="/contact" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Contact</Link>
                {user && <Logout />}
            </div>
        </nav>
    )
}