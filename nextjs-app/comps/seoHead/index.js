import Head from "next/head";

export default function SEOHead(props) {

    return (
        <Head>
            
            <title>LasTag | {props.title}</title>
            <meta name="description" content={props.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="images/logo.png" />

            {/* //   <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://lastag.xyz" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="LasTag" />
            <meta property="og:description" content="Your last gamer tag" />
            <meta property="og:image" content="https://lastag.xyz/images/logo.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_small_image" />
            <meta property="twitter:domain" content="lastag.xyz" />
            <meta property="twitter:url" content="https://lastag.xyz" />
            <meta name="twitter:title" content="lastag" />
            <meta name="twitter:description" content="Your last gamer tag" />
            <meta name="twitter:image" content="https://lastag.xyz/images/logo.png" />

            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content="lastag" />
            <meta itemprop="description" content="Your last gamer tag" />
            <meta itemprop="image" content="https://lastag.xyz/images/logo.png" />

            {/* Site keywords */}
            <meta name="keywords" content="lastag, gamer, tag, gamertag, dashboard, linktree, friends, available gamertag, share gamertag, gaming, lastag, game, levels, discordbot, dashboard, web, add to server, invite, support, help, discord support, bots for discord" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="5 days" />
            
        </Head>
    )

}