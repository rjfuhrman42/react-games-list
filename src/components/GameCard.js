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

    const isGameAlreadyInList = async () => {
        if(!isLoggedIn || inList === true) return        // User is not logged or the game has already been identified as being in the list, then no need to check

        setInList(await fire.isGameAlreadyInList(title)) // Check if the game is in the users list and set the result (true or false)
    }

    return (
        <div className="game-card" style={background}>
            <div className="title-container bg-blue-600">
                <h4 className="h-10 mt-4 text-center" onMouseEnter={() => isGameAlreadyInList()}>{title}</h4>
                <p className="hidden-contents">Genres: {genres}</p>
                <p className="hidden-contents">Release: {data.released}</p>

                {fire.auth.currentUser ? inList ?  
                 <button
                    className="inList font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                 >
                    In List ✔
                 </button>
                :                                                               // This may need to be cleaned up for readability ... 
                <Modal onClick={() => setInList(true)} 
                       game={{
                                image: image,
                                title: title,
                                genres: genres
                            }}
                       currClass="hidden-contents"
                            >
                    Add to list <span role="img">➕</span>
                    
                </Modal>
                : 
                <h1 className="hidden-contents">Log in to rate this game!</h1>}
                <a className="hidden-contents bg-blue-500" href={'https://rawg.io/games/' + data.slug} target="_blank"> View on RAWG.io</a>
            </div>
        </div>
    )
}

export default GameCard