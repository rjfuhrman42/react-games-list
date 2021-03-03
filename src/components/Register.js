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
        <div className="flex justify-center items-center content-around w-full">
            <div className="bg-white rounded w-10/12 shadow-xl text-black p-8 flex flex-col content-around sm:w-xtra sm:p-20 ">
                <h1 className="text-2xl font-bold mb-6 leading-none sm:text-3xl">Create an Account</h1>
                <form className="mb-6">
                    <h3>Username</h3>
                    <input className="border border-rounded rounded-md border-grey h-10 w-full text-black p-2 mb-3 sm:p-2 sm:mb-6 sm:h-14" 
                           type="text"
                           placeholder="enter a username"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                    />
                    <h3>Email</h3>
                    <input className="border border-rounded rounded-md border-grey h-10 w-full text-black p-2 mb-3 sm:p-2 sm:mb-6 sm:h-14" 
                           type="email"
                           placeholder="enter email address"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                    />
                    <h3>Password</h3>
                    <input className="border border-rounded rounded-md border-grey h-10 w-full text-black p-2 mb-3 sm:p-2 sm:mb-6 sm:h-14" 
                           type="password"
                           placeholder="enter password"
                           onChange={(e) => setPassword(e.target.value)}                    // this cant be okay....
                           value={password}
                           />
                </form>
                <button onClick={() => onRegister()} className="bg-blue-500 border border-rounded rounded-md p-2 text-white hover:bg-blue-400">Sign Up!</button>
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