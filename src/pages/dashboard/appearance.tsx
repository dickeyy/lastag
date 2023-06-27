import DashboardNav from "@/comps/dashboardNav";
import DashboardPreview from "@/comps/dashboardPreview";
import SEOHead from "@/comps/seoHead";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
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
    
    const res:any = axios.get(`${process.env.API_URL}/api/tag?tag=${user?.username}`)
    
    // resolve the promise
    const json = await res

    return {
        props: {
            data: json.data
        },
    };
}

export default function DashboardAppearance(props: any) {
    const { isLoaded, isSignedIn, user } = useUser()

    const [tags, setTags] = useState(props.data.tagData.tags)
    const [socials, setSocials] = useState(props.data.tagData.socials)
    const [theme, setTheme] = useState(props.data.tagData.style.theme)

    const availableThemes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ]

    if (!isSignedIn) {
        return (
            <RedirectToSignIn />
        )
    }

    const changeTheme = async (theme: string) => {
        console.log(theme);
        const req = fetch(`/api/change-theme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                theme: theme,
                username: user?.username
            }),
        })
        const res = await req
        const json = await res.json()
        showToast()
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
			<SEOHead title={"Page Appearance"} />
			
			<DashboardNav />

            <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-2 gap-10 mt-[8rem] mb-[5rem] sm:w-[90%] w-[100%]">
                <div className="col-span-3">

                    <h1 className="text-4xl font-bold">Choose a theme</h1>
                    <div className="flex flex-row items-center mt-2">
                        
                        <p className="text-base-content/50">Most of these themes are built by </p>
                        <a href="https://daisyui.com" target="_blank" aria-current="page" aria-label="DasiyUI Homepage" className="flex-0 btn btn-ghost btn-sm gap-0.5 px-2 ">
                            <svg className="h-5 w-5" width="32" height="32" viewBox="0 0 415 415" xmlns="http://www.w3.org/2000/svg">
                                <rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5"></rect>
                                <circle cx="207.5" cy="135" r="130" fill="black" fill-opacity=".3"></circle>
                                <circle cx="207.5" cy="135" r="125" fill="white"></circle>
                                <circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle>
                            </svg> 
                            <div className="font-title inline-flex text-lg">
                                <span className="lowercase">daisy</span> 
                                <span className="uppercase text-[#1AD1A5]">UI</span>
                            </div>
                        </a>
                    </div>

                    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 mt-5">

                        {availableThemes.map((theme, index) => (

                            <div className={`border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent
                            `} key={index}
                                data-theme={theme} onClick={() => {
                                    setTheme(theme)
                                    changeTheme(theme)
                                }}
                            >
                                <div className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>
                                        <div className="bg-base-300 col-start-1 row-start-3"></div>

                                        <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                                            <h1 className="text-lg font-bold mb-2">{theme}</h1>
                                            <div className="flex flex-row flex-wrap justify-between">
                                                <div className="btn btn-primary btn-sm mb-1">L</div>
                                                <div className="btn btn-secondary btn-sm mb-1">S</div>
                                                <div className="btn btn-accent btn-sm mb-1">T</div>
                                                <div className="btn btn-neutral btn-sm mb-1">G</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

                <div className="grid col-span-1 p-5 sm:w-fit w-full h-fit justify-center items-center text-center">
                    <DashboardPreview tags={tags} data={props.data} socials={socials} theme={theme} />

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