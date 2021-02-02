import React from "react"
import GameCard from './GameCard';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
    display: block;
    margin-top: 2em;
    grid-column-start: 1;
    grid-column-end: 5;
    justify-self: center;

`
// flex flex-1 flex-wrap flex-row m-auto justify-center ---> the old flex css
// grid???
function GamesList({children, games, isLoggedIn, isLoading, search}) {

    if(isLoading) return (
        <div className="grid grid-cols-1 pt-4 h-full m-auto 2xl:w-games 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xl:w-full">
            {search}
            <SyncLoader
                    css={override}
                    size={15}
                    color={"#60a5fa"}
                    loading={isLoading}
                /> 
        </div>
    )
    else return(
        <div className="grid grid-cols-1 pt-4 h-full m-auto 2xl:w-games 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xl:w-full">
        {search}
        {/* {children} */}
        {  
                games.map(game => 
                    <GameCard key={game.id} data={game} isLoggedIn={isLoggedIn}/>
                )
        }                   
        </div>
    )
}

export default GamesList