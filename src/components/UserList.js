import React,{ useState, useEffect } from "react" 
import Modal from "./Modal"
import fire from "../config/fire"

import '../assets/userList.css'


function UserList() {

    let [list, setList] = useState([])                                      // the list of jsx components aka each individual list entry
    let [usersGames, setUsersGames] = useState([])                          // the list of games stored in the user's list, represented as objects
    let [ascending, setAscending] = useState(false)
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
                let {image, title, rating, key} = game
            
                let row = <tr key={key}>
                            <td className="image-col" style={{backgroundImage: `url('${image}')`,}}>
                                
                            </td>
                            <td className="pl-4 text-blue-100">
                                {title}
                                <Modal currClass="float-right"
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
                let {title, rating} = data.val()                                    // Whenever something changes about a game (e.g. rating) firebase will update the games list with the change
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
                let {title} = data.val()                                    
                let removed = usersGames.filter((game) => game.title !== title)   
                if(removed.length > 0) setUsersGames(removed) 
            })
    }

    function sortGames(type) {

        let sorted;

        switch(type) {
            case "rating":
              sorted = usersGames.sort((curr, next) => {
                    return ascending ? curr.rating - next.rating : next.rating - curr.rating     // when sorting by rating the 4th game down gets changed no matter what?
                })
              break;
            case "title":
                sorted = usersGames.sort((curr, next) => {
                    if(ascending) return curr.title > next.title ? 1 : -1 
                    else return next.title < curr.title ? -1 : 1
                    // return ascending ? curr.title < next.title : next.title < curr.title     
                })
               console.log(sorted, "here")
              break;
            default:
              return
          } 

        setAscending(prev => !prev) // should be setDescending
        setUsersGames([...sorted])
    }

        useEffect(() => {

            getGamesFromFirebase()                                      // On page load, grab a snapshot of the user's list from firebase
            return () => ref.off()
        }, [])

        useEffect(() => {
            setListItems()

        }, [usersGames])                   // Whenever the user's games are updated, update the table as well 


    return (
        <table className="bg-blue-500 text-blue-100 w-11/12 mt-4 text-m m-auto mt-2 sm:text-lg 2xl:w-customXL">
            <thead className="bg-blue-400 text-white rounded">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">
                        <button className="hover:text-orange-300" onClick={() => sortGames("title")}>Title</button>
                    </th>
                    <th scope="col">
                        <button className="hover:text-orange-300" onClick={() => sortGames("rating")}>Rating</button> 
                    </th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

export default UserList