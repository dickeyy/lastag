import type { WebhookEvent } from "@clerk/clerk-sdk-node" 
import client from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

export default function (req: NextApiRequest, res: NextApiResponse) {

    const evt = req.body as WebhookEvent; 
    switch (evt.type) {
        case 'user.created': // this is typed
            let db = client.db("main")

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