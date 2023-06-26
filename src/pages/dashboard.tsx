import Navbar from "@/comps/navbar";
import SEOHead from "@/comps/seoHead";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser()

    if (!isSignedIn) {
        return (
            <RedirectToSignIn />
        )
    }

    return (
        <main
      		className={`flex min-h-screen flex-col items-center justify-center px-10 ${inter.className}`}
			data-theme="dracula"
    	>	
			<SEOHead title={"Dashboard"} />
			
			<Navbar />	

            <h1>{user?.username}</h1>
        </main>
    )
}