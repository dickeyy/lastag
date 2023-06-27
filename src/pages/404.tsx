import SEOHead from "@/comps/seoHead"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function fourohfour() {
    return (
        <main
      		className={`flex min-h-screen flex-col items-center justify-center px-10 ${inter.className}`}
			data-theme={'dracula'}
    	>	
			<SEOHead title={'404'} />

            <h1>{process.env.API_URL}</h1>
        </main>
    )
}