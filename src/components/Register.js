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
        <div className="absolute flex justify-center mt-6 items-center content-around w-full sm:mt-0">
            <div className="bg-white rounded w-10/12 shadow-xl text-black mt-16 p-12 flex flex-col content-around sm:w-xtra sm:p-20 ">
                <h1 className="text-3xl font-bold mb-6 leading-none">Create an Account</h1>
                <form className="mb-6">
                    <h3>Username</h3>
                    <input className="border border-rounded rounded-md border-grey h-14 w-full text-black p-2 mb-6" 
                           type="text"
                           placeholder="enter a username"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                    />
                    <h3>Email</h3>
                    <input className="border border-rounded rounded-md border-grey h-14 w-full text-black p-2 mb-6" 
                           type="email"
                           placeholder="enter email address"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                    />
                    <h3>Password</h3>
                    <input className="border border-rounded rounded-md border-grey h-14 w-full text-black p-2 mb-6" 
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