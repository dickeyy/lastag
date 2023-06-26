import { Inter } from 'next/font/google'
import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seoHead'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { SignUp } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const submit = () => {
        console.log(username, password);
    };

    return (
        <main
      		className={`flex min-h-screen flex-col items-center justify-center px-10 ${inter.className}`}
			data-theme="dracula"
    	>	
			<SEOHead title={"Log In"} />
			
			<Navbar />	

            <div className="hero min-h-screen">

                <SignUp />
                
                {/* <div className="hero-content bg-base-200 flex-col rounded-lg p-10 text-left flex-wrap">
                    <h1 className="text-4xl font-bold mb-4">Sign up for Lastag</h1>

                    <form className="form-control w-full">
                        <input 
                            type="text" 
                            name='username'
                            placeholder="username" 
                            className="input input-bordered mb-4" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <input 
                            type="password" 
                            name='password'
                            placeholder="password" 
                            className="input input-bordered mb-4" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button className="btn btn-primary mt-4">Sign Up</button>
                    </form>

                    <p className='text-zinc-400'>By clicking <span className="font-bold">Sign Up</span>, you agree to our <a className="link link-hover">Terms</a> and <a className="link link-hover">Privacy</a></p>

                    <div className="divider">OR</div>

                    <button className="btn w-full btn-neutral">
                        <FaGoogle className="mr-2" />
                        Sign up with Google
                    </button>

                </div> */}
            </div>

    	</main>
    )
}