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

    const res = await fetch(`http://localhost:3000/api/tag?tag=${user?.username}`)    
    const json = await res.json()

    console.log(json);

    return {
        props: {
            data: json
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
			<SEOHead title={"Page Settings"} />
			
			<DashboardNav />

            <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-2 gap-10 mt-[8rem] mb-[5rem] sm:w-[70%] w-[100%]">
                <div className="col-span-3">

                    <div className="bg-base-200 p-5 rounded-box">
                        <h1 className="text-4xl font-bold mb-2">Social Media</h1>
                        <p className="text-base-content/50 mb-5">Add icons linking to social media accounts on your page</p>

                        {socialOptions.map((social: any, index: number) => (
                            <div className='mb-4'>

                                <DashboardSocial  social={{social_name: social, username: props.data.tagData.socials[index]?.username || null}} 
                                    setSocials={setSocials} showToast={showToast} user={user} socials={socials}
                                />

                            </div>
                        ))}
                    </div>

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