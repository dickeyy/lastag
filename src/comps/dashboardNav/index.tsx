import { SignOutButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { FaUserCircle, FaGripVertical, FaArrowCircleLeft, FaLink, FaTag, FaTags, FaEye, FaChartLine, FaCog, FaStar, FaShare, FaCopy } from "react-icons/fa"

export default function DashboardNav(props: any) {

    const { isLoaded, isSignedIn, user } = useUser()

    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
    }, [showToast])

    return (
        <div className="
                navbar bg-[#b4b4b4]/[0.2]
                backdrop-filter
                backdrop-blur-[20px]
                shadow-lg
                rounded-lg
                fixed
                top-0
                z-50
                mt-3
                mb-4
                w-[98vw]
            "
        >
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl" href="/">
                <div
                    className="
                        flex
                        flex-row
                        items-center
                    "
                >
                        <img src={'/images/logo.png'} className="w-10 ml-[-8px] " />
                        
                    </div>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a href={'/dashboard'}><FaTags />Tags</a></li>
                <li><a href={'/dashboard/appearance'}><FaEye />Appearance</a></li>
                <li><a href={'/dashboard/analytics'}><FaChartLine />Analytics</a></li>
                <li><a href={'/dashboard/settings'}><FaCog />Settings</a></li>
                </ul>
            </div>
            {isSignedIn ? ( 
                <div className="navbar-end">
                    <a className="btn btn-primary mr-2" href="/pricing">
                        <FaStar /> Upgrade
                    </a>
                    <a className="btn btn-ghost mr-2" onClick={() => {
                        const modal: any = document.getElementById("my_modal_3");
                        modal?.showModal()
                    }}>
                        <FaShare /> Share
                    </a>

                    <dialog id="my_modal_3" className="modal">
                        <form method="dialog" className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <h3 className="font-bold text-lg">Share your Lastag!</h3>
                            <p className="text-base-content/50">The following links are available to you:</p>

                            <a className="btn btn-outline btn-primary w-full mb-5 mt-5 text-base-content/50 btn-lg text-2xl font-black lowercase"
                                onClick={() => {
                                    navigator.clipboard.writeText(`lastag.xyz/${user.username}`)
                                    setShowToast(true)
                                }}
                            >
                                <FaCopy /> 
                                <span className="text-base-content/50">lastag.xyz/<span className="text-base-content">{user.username}</span></span>
                            </a>

                            <a className="btn btn-outline btn-primary w-full text-base-content/50 btn-lg text-2xl font-black lowercase"
                                onClick={() => {
                                    navigator.clipboard.writeText(`lstg.xyz/${user.username}`)
                                    setShowToast(true)
                                }}
                            >
                                <FaCopy /> 
                                <span className="text-base-content/50">lstg.xyz/<span className="text-base-content">{user.username}</span></span>
                            </a>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src={user.imageUrl} />
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-200 rounded-box w-52">
                            <p className="text-lg mb-2">Hey, <span className="text-lg font-bold text-primary">{user.username}</span></p>
                            <ul tabIndex={0} className="">
                                <li>
                                    <a className="justify-start" href='/account'>
                                        <FaUserCircle className="mr-2" />
                                        Account
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-start" href='/dashboard'>
                                        <FaGripVertical className="mr-2" />
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-start">
                                        <FaArrowCircleLeft className="mr-2" />
                                        <SignOutButton/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="navbar-end">
                    <a className="btn btn-primary px-8" href="/signin">Sign In</a>
                </div>
            )}

            {showToast ? (
                <div className="toast toast-center">
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Copied to clipboard</span>
                    </div>
                </div>
            ): null}
        </div>
    )
}