import React,{ useState, useEffect } from "react" 
import fire from "../config/fire"


function UserList() {

    let [list, setList] = useState([])

    useEffect(() => {
        let ref = fire.getListRef()
        ref.once('value', (snapshot) => {

            let temp = []

            snapshot.forEach(snap => {
                let {image, title, rating} = snap.val()
                let row = <tr>
                            <td>
                                <img src={image} className="w-24"></img>
                            </td>
                            <td>{title}</td>
                            <td>{rating}</td>
                          </tr>
                temp.push(row)
            })

            setList(temp)

        })
    }, [])

    return (
        <table className="bg-gray-700 text-gray-300">
            <thead className="bg-black text-white">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default UserList