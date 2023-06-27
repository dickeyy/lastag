import client from "../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

let db = client.db("main")

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // get the body from the request
    const body = req.body;

    // get the tag from the body
    const username = body.username as string;
    const theme = body.theme as string;

    // get the tag doc
    const tagDoc = await db.collection("tags").findOne({ tag_name: username });

    // if the tag doc does not exists
    if (!tagDoc) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    
    // tag doc exists. udate the style.theme to the given theme
    await db.collection("tags").updateOne({ tag_name: username }, { $set: { style: { theme: theme } } });

    res.status(200).json({
        status: "success",
    });

}