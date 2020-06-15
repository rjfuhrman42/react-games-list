import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import fire from "../config/fire"

function Register({checkInitialization})
{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();
    
    return (
        <div>
            <div className="bg-gray-700 w-64 rounded text-white m-auto mt-4 p-4">
                <form>
                    <h3>Username</h3>
                    <input className="border-2 border-black text-black" 
                           type="text"
                           placeholder="enter a username"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                    />
                    <h3>Email</h3>
                    <input className="border-2 border-black text-black" 
                           type="email"
                           placeholder="enter email address"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                    />
                    <h3>Password</h3>
                    <input className="border-2 border-black text-black" 
                           type="password"
                           placeholder="enter password"
                           onChange={(e) => setPassword(e.target.value)}                    // this cant be okay....
                           value={password}
                           />
                </form>
                <button onClick={() => onRegister()} className="bg-blue-500 p-2 m-2">Sign Up!</button>
            </div>
        </div>
    )

    async function onRegister() {
        try {
            await fire.register(name, email, password)
            checkInitialization()
            history.push("/");
        } catch(error) {
            alert(error.message)
        }
    }
}

export default Register