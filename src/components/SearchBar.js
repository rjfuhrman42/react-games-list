import React from "react"

function SearchBar({handleKeyPress}) {
    return (
        <div id="search_bar" className="w-3/6 m-auto border-b-2 border-solid border-gray-700" onKeyPress={handleKeyPress}>
            <input type="text" className="text-4xl bg-black text-gray-600" id="search" placeholder="search for a game..."/>
        </div>
    )
}

export default SearchBar