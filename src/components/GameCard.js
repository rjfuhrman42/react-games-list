import React, {useState} from "react"

function GameCard(props) {

    const [image, setImage] = useState(props.image)
    const [title, setTitle] = useState(props.title)

    const background = {
        backgroundImage: `url('${props.image}')`
    }

    return (
        <div className="w-1/5 m-2 h-104 bg-black text-white">
            <div className="w-full h-poster float-left overflow-hidden bg-center bg-cover" style={background}>
            </div>
            <div className="title-container">
                <h4 className="text-grey-700 text-xl">{title}</h4>
            </div>
        </div>
    )
}

export default GameCard