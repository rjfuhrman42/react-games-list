import React from "react";
import fire from "../config/fire"

function Modal({onClick, game, children}) {
  const [showModal, setShowModal] = React.useState(false);

  function onSubmit() {
      let select = document.getElementById('user-rating')
      let rating = select.value

      if(rating === "-- Pick a rating --"){
          //dont save that value 
          console.log(rating)
      }
      else {
        fire.addGame(game, rating)
        setShowModal(false)
      }
  }

  return (
    <>
      <button
        className="hidden-contents button font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    {game.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative inline-flex p-6 flex-auto">
                  <h4 className="my-4 text-black text-lg leading-relaxed w-1/2">
                    What would you rate this game?
                  </h4>
                    <select id="user-rating" className="w-1/2 border border-solid border-b border-solid border-gray-300 text-black">
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
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                        onSubmit()
                        onClick()
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal