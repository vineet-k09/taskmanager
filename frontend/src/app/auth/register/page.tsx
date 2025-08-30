'use client'
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/register/`

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    })
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (user.password && user.confirm_password && user.password != user.confirm_password) {
            alert("Password do not match")
            return
        }

        const data = { username: user.username, email: user.email, password: user.confirm_password }

        try {
            const res = await axios.post(baseUrl, data)
            alert("User created: " + JSON.stringify(res.data));
            redirect('/auth/login')
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
                    <h1 className="bold mx-auto text-2xl font-bold">Register</h1>
                    <label htmlFor="username" className="flex justify-between items-center">Username:
                        <input className="p-2" id="username" type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </label>
                    <label htmlFor="email" className="flex justify-between items-center">Email:
                        <input className="p-2" id="email" type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </label>
                    <label htmlFor="password" className="flex justify-between items-center">Password:
                        <input className="p-2" id="password" type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </label>
                    <label htmlFor="confirm_password" className="flex justify-between items-center">Confirm password:
                        <input className="p-2" id="confirm_password" type="password"
                            value={user.confirm_password}
                            onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
                        />
                    </label>

                    <button type="submit" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Register</button>

                    <h2>Already a user? <Link href="/auth/login" className="border-emerald-800 border-2 hover:bg-emerald-800 px-5 py-1 rounded-md ml-2">Login</Link> </h2>
                </form>
            </main>
        </div>
    )
}