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
        <div className="absolute flex justify-center w-full">
            <div className="bg-white w-1/3 rounded shadow-xl text-black mt-16 p-24">
            <h1 className="text-3xl font-bold">Create an Account</h1>
                <form>
                    <h3>Username</h3>
                    <input className="border border-rounded border-grey h-14 w-full text-black" 
                           type="text"
                           placeholder="enter a username"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                    />
                    <h3>Email</h3>
                    <input className="border border-rounded border-grey h-14 w-full text-black" 
                           type="email"
                           placeholder="enter email address"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                    />
                    <h3>Password</h3>
                    <input className="border border-rounded border-grey h-14 w-full text-black" 
                           type="password"
                           placeholder="enter password"
                           onChange={(e) => setPassword(e.target.value)}                    // this cant be okay....
                           value={password}
                           />
                </form>
                <button onClick={() => onRegister()} className="bg-blue-500 p-2 m-4 text-white">Sign Up!</button>
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