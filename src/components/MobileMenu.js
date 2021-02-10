import React,{ useState } from "react"

import HamburgerMenu from "react-hamburger-menu"

function MobileMenu({children, shown}) {
    
    let [open, setOpen] = useState(false)


    function handleClick() {
        setOpen(prev => !prev)
    }
    

    return (
        <div className={`inline-block cursor-pointer pr-3.5 sm:hidden ${shown ? "inline-block" : "hidden"}`}>
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
            <ul className={`absolute right-0 top-16 p-4 text-center w-36 h-36 bg-blue-600 z-10 ${open ? "transition-opacity duration-200 ease-in opacity-100" : "transition-opacity duration-200 ease-in opacity-0"}`}>
              {children}  
            </ul>
        </div>
    )
}

export default MobileMenu