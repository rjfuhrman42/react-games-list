import React from "react";
import fire from "../config/fire"
import '../assets/gameCard.css'

import { IoMdCloseCircle } from 'react-icons/io'
import { IconContext } from "react-icons";



function Modal({onClick, game, currClass, canDelete, children}) {
  const [showModal, setShowModal] = React.useState(false);

  const icon = <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "0.9em", }}>
                    <IoMdCloseCircle />
             </IconContext.Provider> 
  
  function onSubmit() {
      let select = document.getElementById('user-rating')
      let rating = select.value

      if(rating === "-- Pick a rating --"){
          //dont save that value 
      }
      else {
        fire.addGame(game, rating)
        setShowModal(false)
      }
  }

  return (
    <>
      <button
        className={currClass + " font-bold text-sm px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto sm:w-modal">

              {/* ----content---- */}

              <div className="border-0 border-blue-400 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-center justify-between p-2 rounded-t bg-gray-200 h-8">
                  <button
                      className="ml-auto border-0 rounded-full p-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      {icon}
                      {/* <span className="bg-transparent text-2xl block outline-none focus:outline-none">
                        ×
                      </span> */}
                    </button>
                </div>

                {/* ----header---- */}

                <div className="flex flex-col h-88 items-start justify-start p-5 bg-cover bg-center sm:h-104" style={{backgroundImage: `url('${game.image}')`,}}>

                  <h3 className="text-3xl font-semibold text-white bg-blue-700 p-2 rounded-lg">
                    {game.title}
                  </h3>
                  <div className="flex flex-row mt-1">
                    {game.genres.map(genre => <h4 className="text-xs font-semibold  text-white bg-blue-700 p-2 mr-1 rounded-lg sm:text-lg">{genre}</h4>)}
                  </div>
                </div>

                {/* ----body---- */}

                <div className="relative inline-flex flex-auto p-2 border-b border-gray-200 text-black bg-white h-24 items-center sm:p-4">
                  <h4 className=" text-lg leading-relaxed w-1/2">
                    What would you rate this game?
                  </h4>
                    <select id="user-rating" className="w-1/2 border border-solid border-b border-solid border-blue-300 text-black p-2">
                        <option defaultValue={true} >-- Pick a rating --</option>
                        <option value="10">10 Masterpiece</option>
                        <option value="9">9 Great</option>
                        <option value="8" >8 Very Good</option>
                        <option value="7">7 Good</option>
                        <option value="6">6 Fine</option>
                        <option value="5">5 Average</option>
                        <option value="4">4 Bad</option>
                        <option value="3">3 Very Bad</option>
                        <option value="2">2 Horrible</option>
                        <option value="1">1 Appaling</option>
                    </select>
                </div>

                {/*footer*/}

                <div className="flex items-center justify-between p-2 rounded-b bg-gray-100 h-16 sm:p-4">
                  <button
                      className={canDelete ? 
                        "mb-0 bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                      :
                        "hidden pointer-events-none"}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                          fire.removeGame(game.key)
                          setShowModal(false)
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                          onSubmit()
                          // onClick()
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-blue-700 text-white active:bg-green-600 font-bold uppercase text-sm px-5 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal