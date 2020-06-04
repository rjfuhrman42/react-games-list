import React from "react"

function SearchBar({handleKeyPress}) {
    return (
        <div id="search_bar" className="w-3/6 m-auto border-b-4 border-solid border-gray-300 mb-8" onKeyPress={handleKeyPress}>
            <input type="text" className="text-4xl" id="search" placeholder="search for a game..."/>
        </div>
    )
}

export default SearchBar