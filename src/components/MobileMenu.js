import React, { useState } from "react"

import HamburgerMenu from "react-hamburger-menu"

function MobileMenu({children, shown}) {
    
    let [open, setOpen] = useState(false)


    function handleClick() {
        setOpen(prev => !prev)
    }
    

    return (
        <div className={`cursor-pointer pl-2 sm:hidden inline-block ${shown ? "inline-block" : "hidden"}`}>
            <HamburgerMenu
                isOpen={open}
                menuClicked={handleClick}
                width={25}
                height={18}
                strokeWidth={2}
                rotate={0}
                color='white'
                borderRadius={0}
                animationDuration={0.5}
            />
            <ul onClick={() => setOpen(false)} className={`fixed transform top-16 left-0 p-4 z-10 w-full text-center text-xl bg-blue-600
                          ${open ? "opacity-100" : "opacity-0 pointer-events-none"} transition duration-200 ease-linear `}
            >
              {open ? children : ""}  
            </ul>
            {/* <ul className={`fixed transform top-0 p-4 text-center w-full h-36 bg-blue-600 z-10 
                          ${open ? "top-0" : "absolute top-0"} transition duration-200 ease-linear `}
            >
              {open ? children : ""}  
            </ul> */}
        </div>
    )
}

export default MobileMenu