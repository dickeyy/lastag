import Navbar from "@/comps/navbar";
import SEOHead from "@/comps/seoHead";
import { RedirectToSignIn, UserProfile, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function Account() {
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
			<SEOHead title={"Account"} />
			
			<Navbar />	

            <div className="hero min-h-[80vh mt-[10rem] mb-[10rem]">
                <UserProfile appearance={{
                    variables: {
                        colorPrimary: "#ff7ac6",
                        colorBackground: "#181920",
                        colorInputBackground: "#272935",
                    },
                }}
                />
            </div>
        </main>
    )
}   