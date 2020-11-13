import React from "react"
import GameCard from './GameCard';

function GamesList({games, isLoggedIn}) {
    return(
        <div className="flex flex-1 flex-wrap flex-row m-auto justify-center w-5/6 h-full">
            <div className="w-full p-4">
                <div className="float-right mr-48">
                    <label for="sort">Sort by: </label>
                    <select name="sort" id="sort">
                        <option value="popularity">Popularity</option>
                        <option value="release">Release Date</option>
                    </select>
                </div>
            </div>
            {games.map(game => 
                <GameCard key={game.id} data={game} isLoggedIn={isLoggedIn}/>
            )}                   
        </div>
    )
}

export default GamesList