import React, {useState, useEffect} from "react"
import Modal from './Modal'
import fire from "../config/fire"

import '../assets/gameCard.css'

function GameCard({data, isLoggedIn}) {

    const [image, setImage] = useState(data.background_image)
    const [title, setTitle] = useState(data.name)
    const [genres, setGenres] = useState(data.genres.map(genre => `${genre.name} `))
    const [inList, setInList] = useState()
    
    const background = {
        backgroundImage: `url('${image}')`,
    }

    const isGameAlreadyInList = () => {
        if(!isLoggedIn) return

        let ref = fire.getListRef()

        ref.once('value', (snapshot) => {
         snapshot.forEach(snap => {

            let currentTitle = snap.val().title
            if(title === currentTitle) setInList(true)                  // Check the current game title against all other game titles in the database!
                                                                        // If there is a match then dissallow the ability to add and rate the game.

         })
     })
    }

    return (
        <div className="game-card" style={background}>
            <div className="title-container">
                <h4 className="h-10 mt-4 text-center">{title}</h4>
                <p className="hidden-contents">Genres: {genres}</p>
                <p className="hidden-contents">Release: {data.released}</p>
                {isGameAlreadyInList()}
                {fire.auth.currentUser ? inList ?  
                 <button
                    className="hidden-contents inList font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                 >
                    In List ✔
                 </button>
                :                                                               // This may need to be cleaned up for readability ... 
                <Modal onClick={() => setInList(true)} game={{
                    image: image,
                    title: title,
                    genres: genres
                }}>
                    Add to list ➕
                </Modal>
                : 
                <h1 className="hidden-contents">Log in to rate this game!</h1>}
                <a className="hidden-contents bg-blue-600" href={'https://rawg.io/games/' + data.slug} target="_blank"> View on RAWG.io</a>
            </div>
        </div>
    )
}

export default GameCard