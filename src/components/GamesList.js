import React from "react"
import GameCard from './GameCard';

function GamesList({children, games, isLoggedIn}) {
    return(
        <div className="flex flex-1 flex-wrap flex-row m-auto justify-center w-5/6 h-full">
            {children}
            {games.map(game => 
                <GameCard key={game.id} data={game} isLoggedIn={isLoggedIn}/>
            )}                   
        </div>
    )
}

export default GamesList