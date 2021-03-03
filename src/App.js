import React, {useEffect, useState} from 'react';
import fire from "./config/fire"
import SearchBar from './components/SearchBar';
import GamesList from './components/GamesList'
import Login from './components/Login'
import UserList from "./components/UserList"
import SortTab from "./components/SortTab"
import MobileMenu from "./components/MobileMenu"
import Footer from "./components/Footer"

import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaReact } from 'react-icons/fa'
import { BsList, BsBoxArrowLeft, BsBoxArrowInUp } from 'react-icons/bs'
import { WiStars } from 'react-icons/wi'
import { IconContext } from "react-icons"

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

  // const { history } = props         // gives us acccess to the history object
  //                                   // so that when a user searches for a game while looking at their list
  //                                   // it will bring them back to the main page after hitting enter


  const handleKeyPress = (event) =>
  {
      if(event.key === 'Enter') setUpForSearch()      
  }

  const handleClick = (event) => setUpForSearch()

  function setUpForSearch() {
    if(page > 1) setPage(1)

    let search = document.getElementById('search')
    let term = search.value


    // history.push('/')
    setApiURL(`https://api.rawg.io/api/games?search=${term}&page=${page}`)
  }


  // relevancy is defined by games released 2 months prior to current month, up to the end of the year

  useEffect(() => {

    const date = new Date(Date.now())
    const year = date.getFullYear()

    checkInitialization()

    setApiURL(`https://api.rawg.io/api/games?dates=${year - 1}-10-01,${year}-12-31&ordering=-added&page=${page}`)

  }, [])

  useEffect(() => {
    
  }, [apiURL])

  useEffect(() => setApiURL(prev => prev.replace(/\d+$/g, page)), [page])

  useEffect(() => {
        setLoading(true)
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
  }, [apiURL])

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
    <button name="previousPageButton" className=" bg-blue-700 text-white m-2 p-1.5" onClick={() => changePage(false)} > 
      <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
        <FaAngleLeft />
      </IconContext.Provider> 
    </button>
  )
  :
  (
    <button name="previousPageButton" className=" bg-blue-100 text-white m-2 cursor-default" ></button>
  )

  var returnButton = page > 1 ? 
  (
    <button name="returnButton" className=" bg-blue-700 text-white m-2 p-1.5" onClick={() => setPage(1)} > 
      <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
        <FaAngleDoubleLeft />
      </IconContext.Provider> 
    </button>
  )
  :
  (
    <button name="returnButton" className=" bg-blue-100 text-white m-2 cursor-default" ></button>
  )

  var loggedOutLinks = (
    <div className="justify-between text-sm flex flex-row items-center sm:text-xl text-white">
        <Link to='/login' className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-blue-800 sm:mr-2 ">
            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <BsBoxArrowInUp />
            </IconContext.Provider> 
            <div className="p-0 sm:pb-1 pl-2">
                    Log In
            </div>
        </Link>
        <p className="p-0 hidden sm:pb-1 sm:px-2 sm:inline-block">
            or
        </p>
        <Link to='/register' className="bg-green-500 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-blue-800 sm:ml-2 ">
          <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <WiStars />
          </IconContext.Provider> 
          <div className="p-0 sm:pb-1 pl-2">
                Sign Up
          </div>
        </Link>
    </div>
  )

  var loggedInLinks = (
    <div className="hidden justify-between text-sm items-center sm:text-xl text-white sm:flex">
      <Link to='/list' className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-blue-800 sm:mr-2 ">
        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
            <BsList />
        </IconContext.Provider> 

        <div className="p-0 sm:pb-1 pl-2">My List</div>

      </Link>
      <Link to="/"  onClick={() => {
                                      fire.logout()
                                      checkInitialization()
                            }} 
                className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-red-800 sm:mr-2 ">
            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <BsBoxArrowLeft />
            </IconContext.Provider> 
            <div className="p-0 sm:pb-1 pl-2">
                    Log out
            </div>
      </Link>                          
    </div>
  )


if(firebaseInitialized !== false)
return (
  <div className="App">

    {/* -------------- HEADER -------------- */}

    <header className="w-full z-20 shadow-xl bg-blue-700 p-2 flex justify-between items-center">
      
      {/* -------------- COLLAPSED MOBILE MENU -------------- */}

      <MobileMenu shown={loggedIn}>
        <li>
          <Link to='/list' className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-blue-800 sm:mr-2 ">
            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <BsList />
            </IconContext.Provider> 

            <div className="w-full p-0 sm:pb-1 pl-2">My List</div>

          </Link>
        </li>
        <li>
          <Link to="/"  onClick={() => {
                                      fire.logout()
                                      checkInitialization()
                            }} 
                className="mr-1 text-blue-100 p-4 flex justify-between items-center rounded-lg hover:bg-red-800 sm:mr-2 ">
            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <BsBoxArrowLeft />
            </IconContext.Provider> 
            <div className="w-full">
                    Log out
            </div>
          </Link>
        </li>    
      </MobileMenu>  
      <Link to='/' 
            className="font-bold bg-transparent text-blue-100 w-36 h-full flex items-center justify-around sm:w-56" 
      >
        

        <IconContext.Provider value={{ color: "cyan", className: "global-class-name", size: "3em" }}>
            <FaReact />
        </IconContext.Provider>

        <h2 className="hidden text-xl ml-2 hover:text-blue-200 sm:inline-block">React Games List</h2>
        <h2 className="text-lg mr-4 hover:text-blue-800 sm:hidden">RGL</h2>
      
      </Link>
      
      {loggedIn ? loggedInLinks : loggedOutLinks}

    </header>                     
    {/* -------------- BODY/ROUTES -------------- */}                                  
    <Switch>       
      <Route exact path="/">
        <GamesList games={games} search={<SearchBar handleKeyPress={handleKeyPress} handleClick={handleClick}>
                                          <SortTab getData={setApiURL} reset={setPage} disableSelection={isSearch} />
                                         </SearchBar>} 
                   isLoggedIn={loggedIn} 
                   isLoading={loading}
        > 
          
          
          <div className="flex justify-center items-center h-10 text-sm col-span-1 mr-4 ml-4 2xl:col-span-4 xl:col-span-3 md:col-span-2">
            {returnButton}
            {prevPageButton}
            <h2 className=" row-end-auto text-center text-xl">Page: {page}</h2>
            <button className="p-1.5 bg-blue-700 text-white m-2" onClick={() => changePage(true)} > 
              <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "2em" }}>
                <FaAngleRight />
              </IconContext.Provider> 
            </button>
          </div>
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
    <Footer /> 
  </div>
)
else return (
  <div className="m-auto text-center">
  </div>

  )
}

export default withRouter(App);