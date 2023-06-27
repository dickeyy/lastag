import DashboardNav from "@/comps/dashboardNav";
import DashboardPreview from "@/comps/dashboardPreview";
import DashboardSocial from "@/comps/dashboardSocial";
import SEOHead from "@/comps/seoHead";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import { FaSmile } from "react-icons/fa";
import axios from "axios";

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { userId } = getAuth(ctx.req)
    if (!userId) {
      return {
        redirect: {
          destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
          permanent: false,
        },
      };
    }
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    const res:any = axios.get(`${process.env.NEXT_PUBLIC_API_URL}}/api/tag?tag=${user?.username}`)
    
    // resolve the promise
    const json = await res

    return {
        props: {
            data: json.data
        },
    };
}

export default function DashboardSettings(props: any) {
    const { isLoaded, isSignedIn, user } = useUser()

    const [tags, setTags] = useState(props.data.tagData.tags)
    const [socials, setSocials] = useState(props.data.tagData.socials)
    const [theme, setTheme] = useState(props.data.tagData.style.theme)

    const socialOptions = [
        "twitch",
        "youtube",
        "twitter",
        "facebook",
        "instagram",
        "snapchat",
        "tiktok",
        "reddit",
        "linkedin",
        "github",
        "spotify",
        "discord",
    ]
    
    if (!isSignedIn) {
        return (
            <RedirectToSignIn />
        )
    }

    const showToast = () => {
        const toast = document.getElementById("toast")
        if (toast) {
            toast.classList.remove("hidden")
            setTimeout(() => {
                toast.classList.add("hidden")
            }, 3000)
        }
    }

    return (
        <main
      		className={`flex min-h-screen flex-col items-center justify-center ${inter.className} overflow-x-hidden sm:px-5 px-2`}
			data-theme="dracula"
    	>	
			<SEOHead title={"Analytics"} />
			
			<DashboardNav />

            <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-2 gap-10 mt-[8rem] mb-[5rem] sm:w-[70%] w-[100%]">
                <div className="col-span-3 text-center justify-center items-center">

                    <h1 className="text-4xl font-bold mb-5">Coming Soon</h1>

                </div>
            </div>

            <div id="toast" className="toast toast-center hidden">
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Saved Successfully</span>
                </div>
            </div>
        </main>
    )
} 