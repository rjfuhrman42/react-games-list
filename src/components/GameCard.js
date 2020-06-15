import React, {useState} from "react"
import '../assets/gameCard.css'

function GameCard(props) {

    const [image, setImage] = useState(props.image)
    const [title, setTitle] = useState(props.title)

    const background = {
        backgroundImage: `url('${props.image}')`,
    }

    return (
        <div className="game-card" style={background}>
            <div className="title-container">
                <h4 className="h-full">{title}</h4>
            </div>
        </div>
    )
}

export default GameCard