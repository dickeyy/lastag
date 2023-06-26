import type { WebhookEvent } from "@clerk/clerk-sdk-node" 
import client from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
    },
}

const secret = process.env.CLERK_WH_SECRET as string;

export default async function (req: NextApiRequest, res: NextApiResponse) {

    let db = client.db("main")

    const payload = (await buffer(req)).toString();
    const headers = req.headers as Record<string, string>;

    const wh = new Webhook(secret);
    let msg: any;

    // set the webhook event 
    const evt = msg as WebhookEvent; 

    // verify the webhook
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    switch (evt.type) {
        // User created 
        case 'user.created':
            
            // create the user doc
            db.collection("users").insertOne({
                id: evt.data.id,
                email: evt.data.email_addresses[0].email_address,
                username: evt.data.username,
                pfp: evt.data.profile_image_url,
            }).then(() => {

                // create the tag doc
                db.collection("tags").insertOne({

                    id: evt.data.id,
                    tag_name: evt.data.username,
                    tags: [],
                    socials: [],
                    icon: evt.data.profile_image_url,
                    bio: "",
                    style: {
                        theme: "dracula",
                        background: "#272935",
                        color: "#fff",
                        accent: "#ff7ac6",
                        tag_bg: "#16171d",
                        tag_title: "#fff",
                        tag_desc: "#fff",
                        social: "#fff",
                        social_hover: "#ff7ac6",
                    }

                }).then(() => {
                    client.close()
                    return res.status(200).send("ok")
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).send(err)
                })
            }).catch((err) => {
                console.log(err)
                return res.status(500).send(err)
            })
            break;
        
        // user updated
        case 'user.updated':
            // delete the user doc
            db.collection("users").deleteOne({
                id: evt.data.id
            }).then(() => {
                // create the user doc
                db.collection("users").insertOne({
                    id: evt.data.id,
                    email: evt.data.email_addresses[0].email_address,
                    username: evt.data.username,
                    pfp: evt.data.profile_image_url,
                }).then(() => {
                    client.close()
                    return res.status(200).send("ok")
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).send(err)
                })
            }).catch((err) => {
                console.log(err)
                return res.status(500).send(err)
            })
            break;
    }
}