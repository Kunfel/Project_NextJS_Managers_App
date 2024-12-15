"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any auth tokens or state
    localStorage.removeItem("token");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="bg-slate-200 p-5 shadow-md">
      <nav className="container flex items-center justify-between font-bold">
        <Link 
          href="/challenges" 
          className="text-xl hover:text-purple-700 transition-colors"
        >
          Challenges
        </Link>
        <Button
          onClick={handleLogout}
          className="bg-purple-700 text-white hover:bg-purple-600 px-5 shadow-lg right-7 absolute"
        >
          Logout
        </Button>
      </nav>
    </div>
  );
}