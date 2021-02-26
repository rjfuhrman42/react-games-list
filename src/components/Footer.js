import React from "react"

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { IconContext } from 'react-icons'

import '../assets/footer.css'

function Footer() {
    return (
        <footer id="footer">
            <div className="in-touch"> 
                <a href="https://rjfuhrman42.github.io/Portfolio-Website/" target="_blank">
                    Get in touch
                </a>
            </div>
            <div>
                <ul className="socials">
                        <li>
                            <a href="https://github.com/rjfuhrman42" target="_blank">
                            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "1.5em" }}>
                                <FaGithub />
                            </IconContext.Provider> 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/reid-fuhrman-73324b180/" target="_blank">
                            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "1.5em" }}>
                                <FaLinkedin />
                            </IconContext.Provider> 
                            </a>
                        </li>
                        <li>
                            <a href="mailto:reidjf77@gmail.com" target="_blank">
                            <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "1.5em" }}>
                                <FaEnvelope />
                            </IconContext.Provider> 
                            </a>
                        </li>
                </ul>
            </div>
            <div className="api">
                <a href="https://api.rawg.io/docs/" target="_blank">
                    RAWG API
                </a>
            </div>
        </footer>
    )
}

export default Footer 