"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function login() {
    const [token, setToken] = useState<string|null>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister() {
        const response = await fetch("/api/auth/register", {method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({name, email, password})})
        const data = await response.json()
        if (data.message === "User already created") {
            return alert("User already created")
        }
        alert(data.identity.email)
        localStorage.setItem("token", data.token)
        window.location.href= "/"
    }
    
    async function getToken() {
        setToken(localStorage.getItem("token"))
        if (localStorage.getItem("token")?.length != null) {
            window.location.href="/"
    }}
    
    useEffect(() => {
        getToken()
    }, [])

    return (
        <>
        <div className="h-screen w-screen bg-gray-800 flex justify-center items-center">
            <Card className="w-100">
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-4xl font-bold">Register</CardTitle>
                <CardDescription>Create New Account </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} autoComplete="off" className="bg-gray-200 border border-gray-500 mb-2"/>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} autoComplete="off" className="bg-gray-200 border border-gray-500 mb-2"/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="bg-gray-200 border border-gray-500 mb-2"/>
                <Button onClick={handleRegister}>Create Account</Button>
            </CardContent>
            <div className="w-full flex justify-end items-center px-4">
                <p>Already have an account?</p>
                <Link href="/login"><Button>Login</Button></Link>
            </div>
            </Card>
        </div>
        </>
    )
}