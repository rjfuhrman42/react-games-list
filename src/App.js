import React, {useEffect, useState} from 'react';
import fire from "./config/fire"
import SearchBar from './components/SearchBar';
import GamesList from './components/GamesList'
import Login from './components/Login'
import UserList from "./components/UserList"
import SortTab from "./components/SortTab"

import { FaReact } from 'react-icons/fa'
import { BsList } from 'react-icons/bs'
import { IconContext } from "react-icons";


import './assets/full.css'

import {
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";

import Register from './components/Register';

function App(props) {
  const [games, setGames] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isSearch, setIsSearch] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [apiURL, setApiURL] = useState()
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  const { history } = props         // gives us acccess to the history object
                                    // so that when a user searches for a game while looking at their list
                                    // it will bring them back to the main page after hitting enter

  const date = new Date(Date.now())
  const year = date.getFullYear()

  const handleKeyPress = (event) =>
  {
      if(event.key === 'Enter')
      {
          if(page > 1) setPage(1)
          setLoading(true)

          let search = document.getElementById('search')
          let term = search.value

          history.push('/')
          setApiURL(`https://api.rawg.io/api/games?search=${term}&page=${page}`)
      }
      
  }

  function getGamesData() {

    fetch(apiURL,
      {
          headers : {
              'User-Agent': 'react-games-list / personal use project'
      }})
      .then(data => data.json())
      .then(games => {
      setIsSearch(isSearch)                                                          // now in a "searched for game" state
 
      setGames(games.results)
      setLoading(false)
    })
  }

  // relevancy is defined by games released 2 months prior to current month, up to the end of the year

  useEffect(() => {
    checkInitialization()

    setApiURL(`https://api.rawg.io/api/games?dates=${year - 1}-10-01,${year}-12-31&ordering=-added&page=${page}`)

  }, [])

  useEffect(() => {
    
  }, [apiURL])

  useEffect(() => setApiURL(prev => prev.replace(/\d+$/g, page)), [page])
  useEffect(() => getGamesData(), [apiURL])

  function changePage(next) {
    if(next) setPage(prev => prev + 1)
    else if(page > 1) setPage(prev => prev - 1)
  }

  function checkInitialization(){
    fire.isInitialized().then(val => {
      setLoggedIn(val ? true : false)
      setFirebaseInitialized(val)
    })
  }

  var prevPageButton = page > 1 ? 
  (
    <button className="col-span-1 row-start-7 row-end-7 bg-blue-600 text-white m-2" onClick={() => changePage(false)} >Prev Page</button>
  )
  :
  (
    <button className="col-span-1 row-start-7 row-end-7 bg-blue-100 text-white m-2 cursor-default" ></button>
  )

  var loggedOutLinks = (
    <div className="w-72 flex justify-between items-center text-white">
        <Link to='/login' className="float-right bg-blue-700 p-4 text-blue-100 hover:bg-blue-800">
          Log In
        </Link>
        or
        <Link to='/register' className="float-right bg-blue-700 p-4 text-blue-100 hover:bg-blue-800">
          Create an account
        </Link>
    </div>
  )

  var loggedInLinks = (
    <div className="flex justify-between text-sm items-center  sm:text-xl text-white">
      <Link to='/list' className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-blue-800 sm:mr-2 ">
        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
            <BsList />
        </IconContext.Provider> 

        <div className="p-0 sm:pb-1 pl-2">My List</div>

      </Link>
      <Link to="/" className="bg-blue-600 text-blue-100 p-4 rounded-lg hover:bg-red-800 sm:">
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
    <header className="w-full shadow-xl bg-blue-400 p-2 flex justify-between items-center">
      <Link to='/' 
            className="font-bold bg-blue-400 text-blue-100 w-36 h-full flex items-center justify-around sm:w-56" 
            // onClick={() => {
            //                   if(page > 1) setPage(1)
            //                   setApiURL(`https://api.rawg.io/api/games?dates=${year - 1}-10-01,${year}-12-31&ordering=-added&page=${page}`)
            //                 }
            //               }
      >
        

        <IconContext.Provider value={{ color: "cyan", className: "global-class-name", size: "3em" }}>
            <FaReact />
        </IconContext.Provider>

        <h2 className="text-sm ml-2 hover:text-blue-800 sm:text-xl">React Games List</h2>
      
      </Link>
      {loggedIn ? loggedInLinks : loggedOutLinks}
    </header>
    <Switch>       
      <Route exact path="/">
        <GamesList games={games} search={<SearchBar handleKeyPress={handleKeyPress}>
                                          <SortTab getData={setApiURL} reset={setPage} disableSelection={isSearch} />
                                         </SearchBar>} 
                   isLoggedIn={loggedIn} 
                   isLoading={loading}
        > 
          
          {prevPageButton}
          <h2 className="col-start-2 col-end-4 row-start-7 row-end-7 text-center">Page: {page}</h2>
          <button className="col-span-1 col-start-4 row-start-7 row-end-7 bg-blue-600 text-white m-2" onClick={() => changePage(true)} >Next Page</button>
        </GamesList>
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

export default withRouter(App);