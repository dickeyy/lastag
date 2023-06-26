import Head from "next/head";

export default function SEOHead(props: any) {
    return (
        <Head>
            <title>{props.title || "Lastag"}</title>
			<meta name="description" content="The last gamer tag you will ever need." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/images/logo.png" />
            <meta name="theme-color" content="#ff7ac6" />

			{/* //   <!-- Facebook Meta Tags --> */}
			<meta property="og:url" content="https://lastag.xyz" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Lastag" />
			<meta property="og:description" content="The last gamer tag you will ever need." />
			<meta property="og:image" content="https://lastag.xyz/images/logo.png" />

			{/* <!-- Twitter Meta Tags --> */}
			<meta name="twitter:card" content="summary_small_image" />
			<meta property="twitter:domain" content="lastag.xyz" />
			<meta property="twitter:url" content="https://lastag.xyz" />
			<meta name="twitter:title" content="The last gamer tag you will ever need." />
			<meta name="twitter:description" content="The last gamer tag you will ever need." />
			<meta name="twitter:image" content="https://lastag.xyz/images/logo.png" />
        </Head>
    )

}