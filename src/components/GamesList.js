import React from "react"
import GameCard from './GameCard';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
    display: block;
    margin-top: 2em;

`

function GamesList({children, games, isLoggedIn, isLoading}) {
    console.log(isLoading)
    return(
        <div className="flex flex-1 flex-wrap flex-row m-auto justify-center w-5/6 h-full">
        {children}
        {
            isLoading ? 
                <SyncLoader
                    css={override}
                    size={15}
                    color={"#60a5fa"}
                    loading={isLoading}
                /> 
                : 
                games.map(game => 
                    <GameCard key={game.id} data={game} isLoggedIn={isLoggedIn}/>
                )
        }                   
        </div>
    )
}

export default GamesList