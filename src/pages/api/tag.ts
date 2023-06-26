import client from "../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

let db = client.db("main")

export default async function (req: NextApiRequest, res: NextApiResponse) {

    //  get the tag from the url 
    const tag = req.query.tag as string;

    console.log(req.query);

    // get the tag doc
    const tagDoc = await db.collection("tags").findOne({ tag_name: tag });

    // get user doc
    const userDoc = await db.collection("users").findOne({ username: tag });

    // if the tag doc exists
    if (tagDoc && userDoc) {
            
        // return the tag doc
        res.status(200).json({
            tagData: tagDoc,
            profilePicture: userDoc.pfp,
        });

    }

    // if the tag doc doesn't exist
    else {
            
        // return a 404
        res.status(404).json({
            error: "Tag not found"
        });

    }
}