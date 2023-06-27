import { useEffect, useState } from "react";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaReddit, FaSnapchat, FaSpotify, FaTiktok, FaTwitch, FaTwitter, FaYoutube, FaSave } from "react-icons/fa";

export default function DashboardSocial(props: any) {

    const [socialName, setSocialName] = useState(props.social.social_name)
    const [socialUsername, setSocialUsername] = useState(props.social.username)
    const [isEnabled, setIsEnabled] = useState(props.socials.find((obj: { name: any; }) => obj.name === socialName))

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

    const saveSocial = (socName:any, socUsername:any) => {
        const req = fetch(`/api/save-social`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: props.user?.username,
                social: {
                    social_name: socName,
                    social_username: socUsername,
                }
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.socialData);
                props.setSocials(json.socialData)

                props.showToast()
            }
        })
    }

    const deleteSocial = (social_name:any) => {
        const req = fetch(`/api/delete-social`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: props.user?.username,
                social: {
                    social_name: social_name,
                }
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.social);
                props.setSocials(json.socialData)

                props.showToast()
            }
        })
    }

    const createNewSocial = () => {
        const req = fetch(`/api/create-social`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: props.user?.username,
                social: {
                    social_name: socialName,
                }
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.socialData);
                props.setSocials(json.socialData)
            }
        })
    }

    const toggleSocial = (social_name:any) => {
        // if the social is already toggled on, run deleteSocial
        console.log(props.social.username)
        if (props.social.username !== null) {
            deleteSocial(social_name)
            setIsEnabled(undefined)
        }
        // if the social is not toggled on, run createNewSocial
        else {
            createNewSocial()
            setIsEnabled(true)
        }
    }

    return (
        <div className='flex flex-col bg-base-200 p-5 rounded-lg justify-between items-center w-full border-2 border-base-300'
            
        >
            <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex flex-row'>

                    {socialName === 'twitter' ? (
                        <FaTwitter className='text-3xl transition-colors duration-200' />
                    ): socialName === 'instagram' ? (
                        <FaInstagram className='text-3xl transition-colors duration-200' />
                    ): socialName === 'facebook' ? (
                        <FaFacebook className='text-3xl transition-colors duration-200' />
                    ): socialName === 'tiktok' ? (
                        <FaTiktok className='text-3xl transition-colors duration-200' />
                    ): socialName === 'youtube' ? (
                        <FaYoutube className='text-3xl transition-colors duration-200' />
                    ): socialName === 'twitch' ? (
                        <FaTwitch className='text-3xl transition-colors duration-200' />
                    ): socialName === 'snapchat' ? (
                        <FaSnapchat className='text-3xl transition-colors duration-200' />
                    ): socialName === 'reddit' ? (
                        <FaReddit className='text-3xl transition-colors duration-200' />
                    ): socialName === 'linkedin' ? (
                        <FaLinkedin className='text-3xl transition-colors duration-200' />
                    ): socialName === 'github' ? (
                        <FaGithub className='text-3xl transition-colors duration-200' />
                    ): socialName === 'spotify' ? (
                        <FaSpotify className='text-3xl transition-colors duration-200' />
                    ): socialName === 'discord' ? (
                        <FaDiscord className='text-3xl transition-colors duration-200' />
                    ): null}

                    <p className='text-xl ml-2 '>{socialName}</p>
                </div>
                <p className=' text-xl link-hover cursor-pointer'
                    onClick={() => {
                        const form: any = document.getElementById(`form-${socialName}`)
                        if (form.classList.contains("hidden")) {
                            form.classList.remove("hidden")
                        } else {
                            form.classList.add("hidden")
                        }
                    }}
                >Click to edit username</p>
                <input type="checkbox" className="toggle toggle-primary"
                    checked={isEnabled == undefined ? false : true}
                    onChange={() => toggleSocial(socialName)}
                />
            </div>

            <div className="hidden flex-row mt-5 w-full" id={`form-${socialName}`}>
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <div className="join w-full">
                    <input type="text" placeholder="Username" className="input mr-2 input-bordered w-full" value={socialUsername} onChange={(e) => setSocialUsername(e.target.value)} />
                    <button className="btn btn-success" onClick={() => {
                        saveSocial(socialName, socialUsername)
                        const form: any = document.getElementById(`form-${socialName}`)
                        if (form.classList.contains("hidden")) {
                            form.classList.remove("hidden")
                        } else {
                            form.classList.add("hidden")
                        }
                    }}>
                        <FaSave />
                    </button>
                </div>

                
            </div>
        </div>
)
}       