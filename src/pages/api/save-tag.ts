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
    
    // tag doc exists. update the tag with the given id to the given name and tag
    await db.collection("tags").updateOne({ tag_name: username, "tags.id": body.tag.id }, { $set: { "tags.$.game_name": body.tag.game_name, "tags.$.game_tag": body.tag.game_tag } });

    // return the tag doc and the tag
    let newArray = tagDoc.tags;
    // update the tag in the array
    newArray = newArray.map((tag:any) => {
        if (tag.id === body.tag.id) {
            return body.tag;
        }
        return tag;
    });

    res.status(200).json({
        tagData: newArray,
    });
}