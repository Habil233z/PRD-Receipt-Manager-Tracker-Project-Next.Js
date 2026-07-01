import { useEffect, useState } from "react"

export default function Header() {
    const [profilePic, setProfilePic] = useState("")
    const [token, setToken] = useState<string|null>(null)

    async function getToken() {
    setToken(localStorage.getItem("token"))
    if (localStorage.getItem("token")?.length == null) {
      window.location.href="/login"
    }}

    useEffect(() => {
    getToken()

    }, [])
    return (
        <>
            <div className="w-full min-h-15 bg-white flex justify-center">
                <div className="w-[65%] flex items-center justify-between">
                    <h1 className="font-bold text-3xl">Receipt Manager</h1>
                    
                </div>
            </div>
        </>
    )
}