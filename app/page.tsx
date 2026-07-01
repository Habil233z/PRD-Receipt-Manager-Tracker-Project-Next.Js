"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string|null>(null)

  async function getToken() {
    setToken(localStorage.getItem("token"))
    if (localStorage.getItem("token")?.length == null) {
      window.location.href="/login"
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <>
      <div className="h-screen w-screen bg-gray-200">
        <h1>Home</h1>
      </div>
    </>
  );
}
