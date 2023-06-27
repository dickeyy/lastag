import client from "../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

let db = client.db("main")

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // get the body from the request
    const body = req.body;

    // get the tag from the body
    const username = body.username as string;

    // create a placeholder tag to the doc.tags array
    // generate a random id\
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const tag = {
        game_name: "placeholder",
        game_tag: "placeholder",
        id: id,
    }

    // get the tag doc
    const tagDoc = await db.collection("tags").findOne({ tag_name: username });

    // if the tag doc does not exists
    if (!tagDoc) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    
    // tag doc exists. add the tag to the tags array
    await db.collection("tags").updateOne({ tag_name: username }, { $push: { tags: tag } });

    // return the tag doc and the tag
    let newArray = tagDoc.tags;

    newArray.push(tag);
    res.status(200).json({
        tagData: newArray,
    });

}