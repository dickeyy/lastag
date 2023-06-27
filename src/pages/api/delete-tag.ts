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
    
    // tag doc exists. update the tag array to remove the tag with the given id
    await db.collection("tags").updateOne({ tag_name: username }, { $pull: { tags: { id: body.tag.id } } });

    // return the tag doc and the tag
    let newArray = tagDoc.tags;
    // pull the tag from the array
    newArray = newArray.filter((tag:any) => tag.id !== body.tag.id);

    res.status(200).json({
        tagData: newArray,
    });

}