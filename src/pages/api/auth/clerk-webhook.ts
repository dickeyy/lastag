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
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    console.log(msg);

    const evt = msg.event as WebhookEvent; 
    switch (evt.type) {
        case 'user.created': // this is typed
            let db = client.db("main")

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
            break;
    }
}