import { SignOutButton, useUser } from "@clerk/nextjs"
import { useState } from "react"
import { FaUserCircle, FaGripVertical, FaArrowCircleLeft } from "react-icons/fa"

export default function Navbar(props: any) {

    const { isLoaded, isSignedIn, user } = useUser()

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
                mt-4
                mb-4
                w-[95vw]
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
                        <img src={'/images/logo.png'} className="w-7 ml-[-8px]" />
                        <div className="
                            flex
                            flex-col
                            justify-center
                            items-center
                            text-center
                         "
                        >
                            <h1
                                className="
                                    font-bold
                                    text-2xl
                                    ml-2
                                "
                            >
                                Lastag
                            </h1>
                        </div>
                        
                        <span className="badge ml-3 badge-ghost">Beta</span>
                        
                    </div>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Features</a></li>
                <li tabIndex={0}>
                    <details>
                        <summary>Use Cases</summary>
                        <ul className="p-2 bg-base-200 ">
                            <li><a>Streamers</a></li>
                            <li><a>Gamers</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Pricing</a></li>
                </ul>
            </div>
            {isSignedIn ? ( 
                <div className="navbar-end">
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
        </div>
    )
}