import React,{ useState } from "react"

import HamburgerMenu from "react-hamburger-menu"

function MobileMenu() {
    
    let [open, setOpen] = useState(false)

    // let menu = <div>
    //     <
    // </div>

    function handleClick() {
        setOpen(prev => !prev)
    }
    

    return (
        <div className="inline-block cursor-pointer pr-3.5 sm:hidden">
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
        
        </div>
    )
}

export default MobileMenu