import React from "react"
import {Link} from "react-router-dom"

function SearchBar({handleKeyPress, children}) {
    return (
        <div id="search_bar" className="w-3/6 m-auto border-b-2 border-solid border-white" onKeyPress={handleKeyPress}>
            <Link to="/">
                <input type="text" className="text-4xl bg-black text-white" id="search" placeholder="search for a game..."/>
            </Link>
        </div>
    )
}

export default SearchBar