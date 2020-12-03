import React from "react"
import { withRouter } from "react-router"

function SearchBar({handleKeyPress, children}) {

    return (
        <div id="search_bar" className="w-3/6 m-auto bg-blue-200 rounded-lg" onKeyPress={handleKeyPress}>
                <input type="text" className="text-2xl bg-blue-200 text-blue-800 w-full p-2 rounded-lg" id="search" placeholder="search for a game..."/>
        </div>
    )
}

export default SearchBar