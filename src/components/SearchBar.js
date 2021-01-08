import React from "react"

function SearchBar({handleKeyPress, children}) {

    return (
        <div id="search_bar" className="col-span-3 justify-self-center m-4 bg-blue-200 rounded-lg" onKeyPress={handleKeyPress}>
                <input type="text" className="w-full p-2 text-2xl bg-blue-200 text-blue-800 rounded-lg" id="search" placeholder="search for a game..."/>
        </div>
    )
}

export default SearchBar