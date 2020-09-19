import React,{ useState, useEffect } from "react" 
import Modal from "./Modal"
import fire from "../config/fire"

import '../assets/userList.css'


function UserList() {

    let [list, setList] = useState([])                                      // the list of jsx components aka each individual list entry
    let [usersGames, setUsersGames] = useState([])                          // the list of games stored in the user's list, represented as objects
    let ref = fire.getListRef()                                             // Firebase reference to the user's list
    
    

    function getGamesFromFirebase() {                                       // Pulls the initial snapshot of data from the DB and puts it into the games state
        ref.once('value', (snapshot) => {

            let temp = []

            snapshot.forEach(snap => {

                let {image, title, genres, rating} = snap.val()
                let game = {
                    title: title,
                    image: image,
                    genres: genres,
                    rating: rating,
                    key: snap.key
                }
                temp.push(game)
            })

            setUsersGames(temp)

        })
    }

    function setListItems() {                                              // Creates JSX items from the data contained in the usersGames


            let temp = []

            usersGames.forEach(game => {
                let {image, title, genres, rating, key} = game
            
                let row = <tr key={key}>
                            <td className="image-col" style={{backgroundImage: `url('${image}')`,}}>
                                
                            </td>
                            <td className="pl-4">
                                {title}
                                <Modal currClass="float-right pr-2"
                                       game={game}
                                >
                                Edit
                                </Modal>
                            </td>
                            <td className="w-24 text-center">{rating}</td>
                          </tr>
                temp.push(row)
            })
            setList(temp)

            ref.on('child_changed', (data) => {                                     // Adds a listener to the list reference 
                let {title, rating} = data.val()                                    // whenever something changes about a game (e.g. rating) firebase will update the games list with the change
                let test = usersGames.map((game) => game.title).indexOf(title)      
        
                if(test >= 0) {
                    setUsersGames(prev => {
                        let arr = [...prev]
                        arr[test].rating = rating                                   // Updates the rating to the new one
                        return arr
                     })
                }
            })

            ref.on('child_removed', (data) => {
                let {title, rating} = data.val()                                    // whenever something changes about a game (e.g. rating) firebase will update the games list with the change
                let removed = usersGames.filter((game) => game.title !== title)   
                if(removed.length > 0) setUsersGames(removed) 
            })
    }

        useEffect(() => {

            getGamesFromFirebase()                                      // On page load, grab a snapshot of the user's list from firebase
            return () => ref.off()
        }, [])

        useEffect(() => {

            setListItems()

        }, [usersGames])                   // Whenever the user's games are updated, update the table as well 

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