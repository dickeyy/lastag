import { FaTwitter, FaInstagram, FaTwitch } from "react-icons/fa";

export default function HomePreview() {
    return (
        <div className="mockup-phone">
            <div className="camera"></div> 
            <div className="display">
                <div className="artboard artboard-demo phone-1 py-5">
                    <img src={"https://dickey.gg/logo.png"} className="w-1/3 mt-5" />
                    <p className="mt-2 text-zinc-400">@dickey</p>

                    <div className="flex flex-row justify-center mt-4">
                        <FaTwitter className="w-8 h-8 mr-3 text-zinc-300" />
                        <FaInstagram className="w-8 h-8 mr-3 text-zinc-300" />
                        <FaTwitch className="w-8 h-8 text-zinc-300" />
                    </div>

                    <div className="flex flex-col justify-center mt-4 bg-white/10 p-4 rounded-lg w-[90%] text-center">
                        <h1 className="text-2xl font-bold">Xbox</h1>
                        <p className="text-xl ml-2 text-zinc-400">@imDickey</p>
                    </div>

                    <div className="flex flex-col justify-center mt-4 bg-white/10 p-4 rounded-lg w-[90%] text-center">
                        <h1 className="text-2xl font-bold">Discord</h1>
                        <p className="text-xl ml-2 text-zinc-400">@dickey.</p>
                    </div>

                    <div className="flex flex-col justify-center mt-4 bg-white/10 p-4 rounded-lg w-[90%] text-center">
                        <h1 className="text-2xl font-bold">Valorant</h1>
                        <p className="text-xl ml-2 text-zinc-400">dickey#6969</p>
                    </div>
                </div>
            </div>
        </div>
    )
}