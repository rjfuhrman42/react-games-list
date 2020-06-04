import React, {useState} from "react"

function GameCard(props) {

    const [image, setImage] = useState(props.image)
    const [title, setTitle] = useState(props.title)

    return (
        <div className="w-auto border-b-2 border-solid border-gray-600">
            <div className="image-container">
                <img className="w-56 float-left"src={image}></img>
            </div>
            <div className="title-container">
                <h4 className="text-grey-700 text-xl">{title}</h4>
            </div>
        </div>
    )
}

export default GameCard