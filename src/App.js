import React, {useEffect, useState} from 'react';
import fire from "./config/fire"
import SearchBar from './components/SearchBar';
import GameCard from './components/GameCard';
import Login from './components/Login'

import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './components/Register';

function App() {
  const [games, setGames] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [userID, setUserID] = useState()
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  const date = new Date(Date.now())

  const year = date.getFullYear()

  let month = date.getMonth() - 1
  month = month > 10 ? month : `0${month}`

  console.log(firebaseInitialized)

  const handleKeyPress = (event) =>
  {
      if(event.key === 'Enter')
      {
          let search = document.getElementById('search')
          let term = search.value
  
          getGamesData(`https://api.rawg.io/api/games?search=${term}`)
      }
  }

  function getGamesData(api_url) {
    fetch(api_url,
      {
          headers : {
              'User-Agent': 'react-games-list / personal use project'
      }})
      .then(data => data.json())
      .then(games => {
        console.log(games.results)
        let temp = []
        games.results.forEach(game => temp.push(<li className="w-3/6 h-40 m-auto list-none" key={game.id}><GameCard title={game.name} image={game.background_image}/></li>))
        setGames(temp)})
  }

  // relevancy is defined by games released 2 months prior to current month, up to the end of the year

  useEffect(() => {

    fire.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })

    const api_url = `https://api.rawg.io/api/games?dates=${year}-${month}-01,${year}-12-31&ordering=-relevance` 
    getGamesData(api_url)

  }, [])

  if(!firebaseInitialized)
    return (
      <div className="App">
        <header className="w-screen m-auto inline">
              <Link to='/' className="float-right border-2 border-green-500 bg-green-200 p-4">
                Home
              </Link>
              <Link to='/login' className="float-right border-2 border-green-500 bg-green-200 p-4">
                Log In
              </Link>
              <Link to='/register' className="float-right border-2 border-green-500 bg-green-200 p-4">
                Register
              </Link>
          <SearchBar handleKeyPress={handleKeyPress}/>      {/* Make this into a separate component, so that when the user signs in they are redirected to their dashboard*/} 
        </header>

        <Switch>       
          <Route exact path="/">
            {games}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

        </Switch>
      </div>
    )
  else return (
    <div className="App">
    <header className="w-screen m-auto inline">
          <Link to='/' className="float-right border-2 border-green-500 bg-green-200 p-4">
            Home
          </Link>
          <button onClick={() => fire.logout()}>Log out</button>      {/* Make this into a separate component, so that when the user signs in they are redirected to their dashboard*/}
      <SearchBar handleKeyPress={handleKeyPress}/>
    </header>

    <Switch>       
      <Route exact path="/">
        {games}
      </Route>
    </Switch>
  </div>
  )
}

export default App;