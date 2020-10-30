import React, {useEffect, useState} from 'react';
import fire from "./config/fire"
import SearchBar from './components/SearchBar';
import GamesList from './components/GamesList'
import Login from './components/Login'
import UserList from "./components/UserList"

import { FaReact } from 'react-icons/fa'
import { IconContext } from "react-icons";


import './assets/full.css'

import {
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './components/Register';

function App() {
  const [games, setGames] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
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
        <Link to='/login' className="float-right border-2 border-gray-900 bg-blue-700 p-4 text-blue-100">
          Log In
        </Link>
        <Link to='/register' className="float-right border-2 border-gray-900 bg-blue-700 p-4 text-blue-100">
          Create an account
        </Link>
    </div>
  )

  var loggedInLinks = (
    <div>
      <Link to='/list' className="mr-2 bg-blue-600 text-blue-100 p-4 hover:bg-blue-800">
        My List
      </Link>
      <Link to="/" className="bg-blue-600 text-blue-100 p-4 hover:bg-blue-800">
        <button
                onClick={() => {
                                  fire.logout()
                                  checkInitialization()
                                  }}>
                Log out
        </button>
      </Link>
    </div>
  )


if(firebaseInitialized !== false)
return (
  <div className="App">
    <header className="w-full bg-blue-400 p-2 flex justify-between items-center">
      <Link to='/' className="font-bold bg-blue-400 text-blue-100 w-56 h-full flex items-center justify-around">

        <IconContext.Provider value={{ color: "cyan", className: "global-class-name", size: "3em" }}>
            <FaReact />
        </IconContext.Provider>

        <h2 className="text-xl hover:text-blue-800">React Games List</h2>
      
      </Link>
      <SearchBar handleKeyPress={handleKeyPress}/> 
      {loggedIn ? loggedInLinks : loggedOutLinks}
    </header>

    <Switch>       
      <Route exact path="/">
        <GamesList games={games} isLoggedIn={loggedIn}/>
      </Route>
      <Route path="/login">
        {loggedIn ? <Redirect to="/"/> : <Login checkInitialization={checkInitialization}/>}
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