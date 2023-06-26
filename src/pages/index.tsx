import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/comps/navbar'
import HomeHero from '@/comps/homeHero'
import SEOHead from '@/comps/seoHead'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
    	<main
      		className={`flex min-h-screen flex-col items-center px-10 ${inter.className}`}
			data-theme="dracula"
    	>	
			<SEOHead />
			
			<Navbar />	

			<HomeHero />

    	</main>
  	)
}
