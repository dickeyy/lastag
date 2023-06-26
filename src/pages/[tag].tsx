import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NextPageContext } from 'next'
import SEOHead from '@/comps/seoHead'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//  get initial props
Tag.getInitialProps = async (ctx: NextPageContext) => {
    const { tag } = ctx.query

    const res = await fetch(`http://localhost:3000/api/tag?tag=${tag}`)    
    const json = await res.json()

    console.log(json);

    return { data: json }
}

export default function Tag({ data }: { data: any}) {
    const router = useRouter()
    const { tag } = router.query

    useEffect(() => {
        if (data.error) {
            window.location.href = '/404'
        }
    }, [])

    return (
        <main
      		className={`flex min-h-screen flex-col items-center justify-center px-10 ${inter.className}`}
			data-theme={data?.tagData?.style?.theme}
    	>	
			<SEOHead title={data.tagData?.tag_name} />

            <div className="hero min-h-[80vh mt-[10rem] mb-[10rem]">
                <div className='hero-content flex-col'>
                    <div className='items-center justify-center text-center'>
                        <img src={data?.profilePicture} alt={`${data.tagData?.tag_name}'s Avatar`} className="mask mask-circle w-45 h-45" />
                        <h1 className="text-2xl opacity-50 font-medium mt-2">@{data?.tagData?.tag_name}</h1>
                    </div>
                </div>
            </div>
        </main>
    )
}