import React, { useState } from "react"
import Modal from './Modal'
import fire from "../config/fire"

import { BsPlus } from 'react-icons/bs'
import { IconContext } from "react-icons"

import '../assets/gameCard.css'

function GameCard({data, isLoggedIn}) {

    const [inList, setInList] = useState()

    let { background_image: image, name: title } = data
    let genres = data.genres.map((genre, index) => index > 0 ? `, ${genre.name}` : `${genre.name}`)

    const ratingColor = data.metacritic >= 70 ? "green" : "yellow"
    const ratingStyle = `float-right text-center m-2 w-10 h-10 bg-blue-900 text-${ratingColor}-400 border border-${ratingColor}-400 rounded-full font-semibold`
    const background = {
        backgroundImage: `url('${image}')`,
    }

    const isGameAlreadyInList = async () => {
        if(!isLoggedIn || inList === true) return        // User is not logged or the game has already been identified as being in the list, then no need to check

        setInList(await fire.isGameAlreadyInList(title)) // Check if the game is in the users list and set the result (true or false)
    }

    return (
        <div className="game-card" style={background}>
            <div className="title-container bg-blue-700">
              {data.metacritic ? <div className={ratingStyle}>
                                    <p className="rating">{data.metacritic}</p>
                                 </div> 
                                 : 
                                 <p></p>}
              <h4 className="h-10 m-4 mb-0 w-3/4 truncate" onMouseEnter={() => isGameAlreadyInList()}>{title}</h4>
                <div className="inner-container">
                    <p className="hidden-contents truncate">{genres}</p>
                    <p className="hidden-contents">{data.released}</p>
                    <div className="grid grid-cols-2 mt-6">
                        {fire.auth.currentUser ? inList ?  
                        <button
                            className="hidden-contents inList font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                        >
                            In List ✔
                        </button>
                        :                                                               // This may need to be cleaned up for readability ... 
                        <Modal onClick={() => setInList(true)} 
                            canDelete={false}
                            game={{
                                        image: image,
                                        title: title,
                                        genres: data.genres.map(genre => genre.name),
                                    }}
                            currClass="hidden-contents bg-green-500 text-white flex justify-center items-center hover:shadow-lg"
                                    >
                            <h5>Add to list</h5>
                            <span role="img">
                                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                                    <BsPlus />
                                </IconContext.Provider> 
                            </span>
                            
                        </Modal>
                        : 
                        <h1 className="hidden-contents text-center px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-gray-700">Log in to rate this game!</h1>}
                        <a className="hidden-contents inline font-bold uppercase text-sm text-center px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-gray-800" 
                        href={'https://rawg.io/games/' + data.slug} 
                        target="_blank" rel="noopener noreferrer">
                            View on RAWG.io 
                        </a>
                    </div>
                
                 </div>
            </div>
        </div>
    )
}

export default GameCard