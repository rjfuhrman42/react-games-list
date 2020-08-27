import React, {useEffect, useState} from 'react';
import fire from "./config/fire"
import SearchBar from './components/SearchBar';
import GamesList from './components/GamesList'
import Login from './components/Login'
import UserList from "./components/UserList"

import './assets/full.css'

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
        setGames(games.results)})
  }

  // relevancy is defined by games released 2 months prior to current month, up to the end of the year

  useEffect(() => {
    checkInitialization()

    const api_url = `https://api.rawg.io/api/games?dates=${year}-${month}-01,${year}-12-31&ordering=-relevance` 
    getGamesData(api_url)

  }, [])

  function checkInitialization(){
    fire.isInitialized().then(val => {
      setLoggedIn(val ? true : false)
      setFirebaseInitialized(val)
    })
  }

  var loggedOutLinks = (
    <div>
        <Link to='/login' className="float-right border-2 border-gray-900 bg-gray-700 p-4 text-white">
          Log In
        </Link>
        <Link to='/register' className="float-right border-2 border-gray-900 bg-gray-700 p-4 text-white">
          Create an account
        </Link>
    </div>
  )

  var loggedInLinks = (
    <div>
      <Link to='/list' className="float-right border-2 border-green-500 bg-green-200 p-4">
        My List
      </Link>
      <button className="float-right border-2 border-red-500 bg-red-200 p-4"
              onClick={() => {
                                fire.logout()
                                checkInitialization()
                                }}>
              Log out
      </button>
    </div>
  )


if(firebaseInitialized !== false)
return (
  <div className="App">
    <header className="w-full bg-black pb-4 mb-6">
      <Link to='/' className="float-right border-2 border-green-500 bg-green-200 p-4">
        Home
      </Link>
      {loggedIn ? loggedInLinks : loggedOutLinks}
      <Link to="/">
        <SearchBar handleKeyPress={handleKeyPress}/>
      </Link>      
    </header>

    <Switch>       
      <Route exact path="/">
        <GamesList games={games} isLoggedIn={loggedIn}/>
      </Route>
      <Route path="/login">
        <Login checkInitialization={checkInitialization}/>
      </Route>
      <Route path="/register">
        <Register checkInitialization={checkInitialization} />
      </Route>
      <Route path="/list">
        <UserList />
      </Route>

    </Switch>
  </div>
)
else return (
  <div className="m-auto text-center">
  </div>

  )
}

export default App;