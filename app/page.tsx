"use client"
import Header from "@/components/header";
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
      <Header />
      <div className="h-screen w-screen bg-gray-200 flex justify-center">
        <div className="bg-gray-300 w-[65%]">
          <h1>Test</h1>
        </div>
      </div>
    </>
  );
}
