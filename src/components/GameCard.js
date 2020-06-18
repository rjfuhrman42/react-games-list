import React, {useState, useEffect} from "react"
import Modal from './Modal'
import fire from "../config/fire"

import '../assets/gameCard.css'

function GameCard({data, isLoggedIn}) {

    const [image, setImage] = useState(data.background_image)
    const [title, setTitle] = useState(data.name)
    const [genres, setGenres] = useState(data.genres.map(genre => `${genre.name} `))
    
    const background = {
        backgroundImage: `url('${image}')`,
    }
    console.log(isLoggedIn)

    useEffect(() => {
        console.log(fire.getDatabase())
    }, [])

    return (
        <div className="game-card" style={background}>
            <div className="title-container">
                <h4 className="h-10">{title}</h4>
                <p className="hidden-contents">Genres: {genres}</p>
                <p className="hidden-contents">Release: {data.released}</p>
                {fire.auth.currentUser ? <Modal title={title}/> : <h1>Log in to rate this game!</h1>}
            </div>
        </div>
    )
}

export default GameCard