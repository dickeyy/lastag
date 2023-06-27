import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export default function DashboardTag(props: any) {

    const [gameName, setGameName] = useState(props.tag.game_name)
    const [gameTag, setGameTag] = useState(props.tag.game_tag)

    const saveTag = (gameName:any, gameTag:any, id:any,) => {
        const req = fetch(`/api/save-tag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: props.user?.username,
                tag: {
                    game_name: gameName,
                    game_tag: gameTag,
                    id: id
                }
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.tagData);
                props.setTags(json.tagData)

                props.showToast()
            }
        })
    }

    const deleteTag = (id:any) => {
        const req = fetch(`/api/delete-tag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: props.user?.username,
                tag: {
                    id: id
                }
            })
        }).then(res => res.json()).then(json => {
            if (json) {
                console.log(json.tagData);
                props.setTags(json.tagData)

                props.showToast()
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center bg-base-200 rounded-box p-6 h-fit mb-5 w-full" id={props.tag.id}>

            <div className="flex sm:flex-row flex-col justify-evenly w-full items-center">

                <form className="form-control flex sm:flex-row flex-col justify-center items-center">
                    <div className="flex flex-col mr-5">
                        <label className="label">
                            <span className="label-text">Game Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Game Name"
                            value={gameName}
                            className="input input-bordered"
                            onChange={(e) => setGameName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text">Gamer Tag</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Gamer Tag"
                            value={gameTag}
                            className="input input-bordered"
                            onChange={(e) => setGameTag(e.target.value)}
                        />
                    </div>

                </form>

                <div className="flex flex-row justify-center sm:mt-0 mt-5 items-center">
                    <button className="btn btn-success mr-2 " onClick={() => {
                        saveTag(gameName, gameTag, props.tag.id)
                    }}>
                        <FaSave />
                    </button>

                    <button className="btn btn-error " onClick={() => deleteTag(props.tag.id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}   