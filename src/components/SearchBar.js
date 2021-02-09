import React from "react"

import { BsSearch } from 'react-icons/bs'
import { IconContext } from "react-icons";

const icon = <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em", }}>
                    <BsSearch />
             </IconContext.Provider> 

function SearchBar({handleKeyPress, handleClick, children}) {

    return (
        <div id="search_bar" className="col-span-full row-span-1 m-4 h-12 bg-blue-200 rounded-lg" onKeyPress={handleKeyPress}>
                <input type="text" className="w-9/12 h-full pl-4 text-2xl bg-blue-200 text-blue-800 rounded-lg" id="search" placeholder="search for a game..."/>

                
                {children}
                <button className="pl-10 w-1/12 h-full bg-blue-300 float-right" onClick={handleClick}>{icon}test</button>
        </div>
    )
}

export default SearchBar