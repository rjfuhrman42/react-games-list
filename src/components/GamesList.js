import React, {useState} from "react"
import GameCard from './GameCard';

function GamesList({games}) {

    return(
        <div className="flex flex-1 flex-wrap flex-row m-auto justify-center w-5/6 h-screen">
            {games.map(game => 
                <GameCard  key={game.id} title={game.name} image={game.background_image}/>
            )}                   
        </div>
    )
}

export default GamesList