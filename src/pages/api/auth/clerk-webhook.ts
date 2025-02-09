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

    const payload = (await buffer(req)).toString();
    const headers = req.headers as Record<string, string>;

    const wh = new Webhook(secret);
    let msg: any;

    // verify the webhook
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    // set the webhook event 
    const evt = msg as WebhookEvent; 

    if (evt) {
        // ensure the client is connected
        await client.connect();
        let db = client.db("main")
        
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
                            pfp_mask: "circle"
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
                        // the only things that can be updated from this webhook on the tag doc are the username and pfp
                        // update the tag doc
                        db.collection("tags").updateOne({
                            id: evt.data.id
                        }, {
                            $set: {
                                tag_name: evt.data.username,
                                icon: evt.data.profile_image_url
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
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).send(err)
                })
                break;
            
            // user deleted
            case 'user.deleted':
                // delete the user doc
                db.collection("users").deleteOne({
                    id: evt.data.id
                }).then(() => {
                    // delete the tag doc
                    db.collection("tags").deleteOne({
                        id: evt.data.id
                    }).then(() => {
                        client.close()
                        return res.status(200).send("ok")
                    }
                    ).catch((err) => {
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    )
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).send(err)
                })
                break;
        }
    } else {
        return res.status(400).send("invalid event")
    }
}