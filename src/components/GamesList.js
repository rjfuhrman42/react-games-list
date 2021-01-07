import React from "react"
import GameCard from './GameCard';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
    display: block;
    margin-top: 2em;

`
// flex flex-1 flex-wrap flex-row m-auto justify-center ---> the old flex css
// grid???
function GamesList({children, games, isLoggedIn, isLoading}) {
    return(
        <div className="grid grid-cols-4 w-9/12 h-full m-auto">
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