import { Inter } from 'next/font/google'
import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seoHead'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { SignIn } from '@clerk/nextjs'

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

                <SignIn />
                
                {/* <div className="hero-content bg-base-200 flex-col rounded-lg p-10 text-left ">
                    <h1 className="text-4xl font-bold mb-4">Log in to Lastag</h1>

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

                        <a href="/forgotpassword" className="link link-hover hover:link-primary mt-0">Forgot Password?</a>

                        <button className="btn btn-primary mt-4">Log In</button>
                    </form>

                    <a href="/signup" className="link link-hover hover:link-primary mt-0 mb-0">Don't have an account?</a>

                    <div className="divider">OR</div>

                    <button className="btn w-full btn-neutral">
                        <FaGoogle className="mr-2" />
                        Log in with Google
                    </button>

                </div> */}
            </div>

    	</main>
    )
}