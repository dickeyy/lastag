import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import SEOHead from '@/comps/seoHead'
import { Inter } from 'next/font/google'
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaReddit, FaSnapchat, FaSpotify, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function DashboardPreview(props: any) {
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
    }, [showToast])
    return (
        <div
      		className={` rounded-box bg-base-100 pt-5 border  ${inter.className} lg:w-[30rem] w-[90vw]`}
			data-theme={props.theme}
        >
            <div className='flex-col h-fit w-full'>
                <div className='items-center justify-center text-center'>
                    <div className={`avatar`}>
                        <div className={`w-32 h-32 rounded-full`}>
                            <img src={props.data?.profilePicture} alt={`${props.data.tagData?.tag_name}'s Avatar`} />
                        </div>
                    </div>
                    <h1 className="text-2xl opacity-50 font-medium mt-2">@{props.data?.tagData?.tag_name}</h1>
                </div>

                <div className='flex flex-col items-center justify-center mt-2'>
                    <div className='flex flex-row items-center justify-center flex-wrap'>
                        {props.socials?.map((social: any) => {
                            return (
                                <a href={social?.url} target='_blank' rel='noreferrer'>
                                    <div className='p-4'>
                                        {social?.name === 'twitter' ? (
                                            <FaTwitter className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'instagram' ? (
                                            <FaInstagram className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'facebook' ? (
                                            <FaFacebook className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'tiktok' ? (
                                            <FaTiktok className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'youtube' ? (
                                            <FaYoutube className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'twitch' ? (
                                            <FaTwitch className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'snapchat' ? (
                                            <FaSnapchat className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'reddit' ? (
                                            <FaReddit className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'linkedin' ? (
                                            <FaLinkedin className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'github' ? (
                                            <FaGithub className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'spotify' ? (
                                            <FaSpotify className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): social?.name === 'discord' ? (
                                            <FaDiscord className='text-5xl text-primary hover:text-primary-focus/50 transition-colors duration-200' />
                                        ): null}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center mt-2 w-full'>
                    {props.tags?.map((tag: any) => {
                        return (
                            <div className="bg-base-200 mb-4 rounded-btn sm:w-2/3 w-full justify-center items-center text-center p-5 py-10 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => {
                                    // copy to clipboard
                                    navigator.clipboard.writeText(tag?.game_tag)
                                    showToast ? setShowToast(false) : setShowToast(true)
                                }}
                            >
                                <h1 className="text-xl font-medium text-base-content/30">{tag?.game_name}</h1>
                                <p className="text-3xl font-bold">{tag?.game_tag}</p>
                            </div>
                        )
                    })}
                </div>

                {showToast ? (
                    <div className="toast toast-center">
                        <div className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Copied to clipboard</span>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
    )
}