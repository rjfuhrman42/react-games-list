import React from "react"

function SortTab({getData, disableSelection}) {

    const handleChange = (event) => {
        let ordering = event.target.value
        getData(ordering)                                           // either need to move all the games logic in here somehow (would need to use context or something)
    }        

    const selector = 
    (
        <div>
            <label for="sort">Sort by: </label>
            <select name="sort" onChange={(e) => handleChange(e)} id="sort">       
                <option value="relevance">Popularity</option>
                <option value="released">Release Date</option>
            </select>           
        </div>
    )

    return (
        <div className="w-full p-4">
            <div className="float-right mr-48 text-xl">
                {disableSelection ? `Results for "${document.getElementById('search').value}"` : selector}
            </div>
        </div>
    )
}

export default SortTab