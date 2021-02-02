import React from "react"

function SearchBar({handleKeyPress, children}) {

    return (
        <div id="search_bar" className="col-span-full row-span-1 m-4 bg-blue-200 rounded-lg" onKeyPress={handleKeyPress}>
                <input type="text" className="w-9/12 p-2 text-2xl bg-blue-200 text-blue-800 rounded-lg sm:w-10/12" id="search" placeholder="search for a game..."/>
                {children}
        </div>
    )
}

export default SearchBar