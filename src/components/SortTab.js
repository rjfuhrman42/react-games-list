import React from "react"

function SortTab({getData, disableSelection, reset}) {

    const date = new Date(Date.now())
    const year = date.getFullYear()

    const handleChange = (event) => {
        let ordering = event.target.value
        reset(1)                                                // resets the current page to page 1
        getData(`https://api.rawg.io/api/games?dates=${year - 1}-10-01,${year}-12-31&ordering=-${ordering}&page=1`)                                           // either need to move all the games logic in here somehow (would need to use context or something)
    }        

    const selector = 
    (
        <div className="h-full bg-blue-400 rounded-r-xl">
           
            <select name="sort" className="bg-blue-400 border-none h-full w-full text-white pl-2" onChange={(e) => handleChange(e)} id="sort">       
                <option className="pl-2" value="relevance">Popularity</option>
                <option className="pl-2" value="released">Release Date</option>
            </select>           
        </div>
    )

    return (
        <div className="m-0 w-2/12 h-full float-right">
            <div className="text-xl h-full w-full float-right">
                {disableSelection ? `Results for "${document.getElementById('search').value}"` : selector}
            </div>
        </div>
    )
}

export default SortTab