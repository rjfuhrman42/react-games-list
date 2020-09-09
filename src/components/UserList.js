import React,{ useState, useEffect } from "react" 
import Modal from "./Modal"
import fire from "../config/fire"

import '../assets/userList.css'


function UserList() {

    let [list, setList] = useState([])

    useEffect(() => {
        let ref = fire.getListRef()
        ref.once('value', (snapshot) => {

            let temp = []

            snapshot.forEach(snap => {
                let {image, title, genres, rating} = snap.val()
            
                let row = <tr key={image}>
                            <td className="image-col" style={{backgroundImage: `url('${image}')`,}}>
                                
                            </td>
                            <td className="pl-4">
                                {title}
                                <Modal currClass="float-right pr-2"
                                       game={{
                                            image: image,
                                            title: title,
                                            genres: genres
                                        }}
                                >
                                Edit
                                </Modal>
                            </td>
                            <td className="w-24 text-center">{rating}</td>
                          </tr>
                temp.push(row)
            })

            setList(temp)

        })
    }, [])

    return (
        <table className="bg-gray-700 text-gray-300 w-1/2 m-auto">
            <thead className="bg-black text-white rounded">
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