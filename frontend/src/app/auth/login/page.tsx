'use client'
import { useUser } from "@/app/context/UserProvider"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login/`

export default function Login() {
    const router = useRouter()
    const {setUser} = useUser()
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await axios.post(baseUrl, userData, {withCredentials: true})
            console.log(res.data)
            setUser(res.data.user)
            alert("User logged in");
            localStorage.setItem('refresh',res.data.refresh)
            router.push('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("An unknown error occurred.");
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col relative">
            <main className="flex-grow flex items-center justify-center">
                <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 p-4 w-[45%] rounded-md">
                    <h1 className="bold mx-auto text-2xl font-bold">Login</h1>
                    <label htmlFor="username" className="flex justify-between items-center">Username:
                        <input className="p-2" id="username" type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                    </label>
                    <label htmlFor="password" className="flex justify-between items-center">Password:
                        <input className="p-2" id="password" type="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                    </label>
                    <button type="submit" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Login</button>
                    <h2>New user? <Link href="/auth/register" className="border-emerald-800 border-2 hover:bg-emerald-800 px-5 py-1 rounded-md ml-2">Register</Link> </h2>
                </form>
            </main>
        </div>
    )
}