import React from "react"

function SortTab({getData, disableSelection}) {

    const date = new Date(Date.now())
    const year = date.getFullYear()

    const handleChange = (event) => {
        let ordering = event.target.value
        getData(`https://api.rawg.io/api/games?dates=${year - 1}-10-01,${year}-12-31&ordering=-${ordering}`)                                           // either need to move all the games logic in here somehow (would need to use context or something)
    }        

    console.log(disableSelection)

    const selector = 
    (
        <div>
            <label htmlFor="sort">Sort by: </label>
            <select name="sort" className="bg-blue-200 border rounded-xl" onChange={(e) => handleChange(e)} id="sort">       
                <option value="relevance">Popularity</option>
                <option value="released">Release Date</option>
            </select>           
        </div>
    )

    return (
        <div className="m-4 col-span-1">
            <div className="float-right pt-3 text-xl">
                {disableSelection ? `Results for "${document.getElementById('search').value}"` : selector}
            </div>
        </div>
    )
}

export default SortTab