import client from "../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

let db = client.db("main")

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // get the body from the request
    const body = req.body;

    // get the tag from the body
    const username = body.username as string;

    // get the tag doc
    const tagDoc = await db.collection("tags").findOne({ tag_name: username });

    // if the tag doc does not exists
    if (!tagDoc) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    let url = ""

    // from the url, get the social name and username
    switch (body.social.social_name) {
        case "twitter":
            url = `https://twitter.com/${body.social.social_username}`;
            break;
        case "instagram":
            url = `https://instagram.com/${body.social.social_username}`;
            break;
        case "twitch":
            url = `https://twitch.tv/${body.social.social_username}`;
            break;
        case "youtube":
            url = `https://youtube.com/channel/${body.social.social_username}`;
            break;
        case "facebook":
            url = `https://facebook.com/${body.social.social_username}`;
            break;
        case "github":
            url = `https://github.com/${body.social.social_username}`;
            break;
        case "linkedin":
            url = `https://linkedin.com/in/${body.social.social_username}`;
            break;
        case "snapchat":
            url = `https://snapchat.com/add/${body.social.social_username}`;
            break;
        case "reddit":
            url = `https://reddit.com/user/${body.social.social_username}`;
            break;
        case "spotify":
            url = `https://open.spotify.com/user/${body.social.social_username}`;
            break;
        case "tiktok":
            url = `https://tiktok.com/@${body.social.social_username}`;
            break;
        case "discord":
            url = `https://discord.gg/${body.social.social_username}`;
            break;
    
        default:
            break;
    }
    
    // tag doc exists. update the tag with the given id to the given name and tag
    await db.collection("tags").updateOne({ tag_name: username, "socials.name": body.social.social_name }, { $set: { "socials.$.name": body.social.social_name, "socials.$.username": body.social.social_username, "socials.$.url": url } });

    // return the tag doc and the tag
    let newArray = tagDoc.socials;
    // update the tag in the array
    newArray = newArray.map((social:any) => {
        if (social.name === body.social.social_name) {
            return body.social;
        }
        return social;
    });

    res.status(200).json({
        socialData: newArray,
    });
}