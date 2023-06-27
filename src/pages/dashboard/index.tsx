import DashboardNav from "@/comps/dashboardNav";
import Navbar from "@/comps/navbar";
import SEOHead from "@/comps/seoHead";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { NextPageContext } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import { GetServerSideProps } from 'next'
import DashboardTag from "@/comps/dashboardTag";
import DashboardPreview from "@/comps/dashboardPreview";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaReddit, FaSnapchat, FaSpotify, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import DashboardSocial from "@/comps/dashboardSocial";

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

export default function Dashboard(props: any) {
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

    const createNewTag = () => {
        const req = fetch(`/api/create-tag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user?.username
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.tagData);
                setTags(json.tagData)
            }
        })
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
			<SEOHead title={"Dashboard"} />
			
			<DashboardNav />

            <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-2 gap-10 mt-[10rem] mb-[5rem] sm:w-[90%] w-[100%]">
                <div className="col-span-3">

                    <div className="mt-10">

                        <button className="btn btn-primary w-full btn-lg mb-5" onClick={() => createNewTag()}>Add New Gamer Tag</button>

                        {tags.map((tag: any) => (
                            <ul className="list-none" key={tag.id}>
                                <li className="text-2xl font-medium text-white/50">
                                <DashboardTag key={tag.id} tag={tag} user={user} setTags={setTags} showToast={showToast} />
                                </li>
                            </ul>
                        ))}

                    </div>

                </div>

                <div className="grid col-span-1 p-5 w-fit h-fit justify-center items-center text-center">
                    <h1 className="text-2xl font-medium mb-2 text-white/50">Preview</h1>
                    <DashboardPreview tags={tags} data={props.data} socials={socials} theme={theme} />

                </div>
            </div>

            <div id="toast" className="toast toast-center hidden">
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Saved Successfully</span>
                </div>
            </div>
        </main>
    )
}