import React,{ useState, useEffect } from "react" 
import Modal from "./Modal"
import fire from "../config/fire"

import '../assets/userList.css'


function UserList() {

    let [list, setList] = useState([])
    let [usersGames, setUsersGames] = useState([])
    let ref = fire.getListRef()
    
    ref.on('child_changed', (data) => {
        let {title, rating} = data.val()
        let test = usersGames.map((game) => game.title).indexOf(title)

        if(test >= 0) {
            setUsersGames(prev => {
                let arr = [...prev]
                arr[test].rating = rating
                return arr
             })
        }
    })

    function getGamesFromFirebase() {
        ref.once('value', (snapshot) => {

            let temp = []

            snapshot.forEach(snap => {
                let {image, title, genres, rating} = snap.val()
                let game = {
                    title: title,
                    image: image,
                    genres: genres,
                    rating: rating
                }
                temp.push(game)
            })

            setUsersGames(temp)

        })
    }

    function setListItems() {


            let temp = []

            usersGames.forEach(game => {
                let {image, title, genres, rating} = game
            
                let row = <tr key={title}>
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
    }

        useEffect(() => {

            getGamesFromFirebase()

        }, [])

        useEffect(() => setListItems(), [usersGames])

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