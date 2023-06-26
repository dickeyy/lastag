import HeroFeature from "../heroFeature";
import HomePreview from "../homePreview";

export default function HomeHero() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='
					absolute
					w-[20rem]
					sm:w-[50rem]
					sm:h-[30rem]
					h-[20rem]
					bg-gradient-to-r from-purple-500 to-pink-500
                    opacity-50
					rounded-full
					blur-[150px]
                    z-[-10]
					animate-blob
				' /> 
                <div className="sm:flex flex-col items-center justify-center hidden">
                    <HomePreview />
                </div>
                <div>
                    <div className="bg-gradient-to-br from-white to-zinc-400 text-transparent bg-clip-text">
                        <h1 className="text-6xl font-black leading-[1.2]">The last gamer tag you will ever need.</h1>
                    </div>
                    <p className="text-xl mt-4 mb-4 w-2/3 text-zinc-400">Gone are the days of trying to remember stupid gamer tags like "xX_Ep1cGaM3r_Xx".</p>
                    <div className="flex flex-row">
                        <button className="btn btn-primary btn-lg mr-2">Get Started</button>
                        <button className="btn btn-primary btn-outline btn-lg">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}