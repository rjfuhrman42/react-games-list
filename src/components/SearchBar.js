import React from "react"

import { BsSearch } from 'react-icons/bs'
import { IconContext } from "react-icons";

const icon = <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em", }}>
                    <BsSearch />
             </IconContext.Provider> 
            //  id="searchbar" 

function SearchBar({handleKeyPress, handleClick, children}) {

    return (
        <div id="search_bar" className="col-span-full row-span-1 flex flex-row justify-end h-12 m-4 bg-blue-200 rounded-l rounded-lg" onKeyPress={handleKeyPress}>
                <input type="text"className="w-full pl-2 h-full self-start text-2xl bg-blue-200 text-blue-800 rounded-lg" id="search" placeholder="search for a game..."/>
                <label htmlFor="searchbar"></label>
                <button name="search" className="p-2 w-auto h-full bg-blue-500" onClick={handleClick}>{icon}</button>
                {children}
        </div>
    )
}

export default SearchBar