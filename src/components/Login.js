import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import fire from "../config/fire"


function Login({checkInitialization}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();

    // function handleChange(e){
    //     let {value} = e.target.value
    //     if(e.target.type === "email") 
    //         setEmail(value)
    //     else setPassword (value)
    // }

    return (
        <div className="flex justify-center items-center content-around w-full">
            <div className="bg-white rounded w-10/12 shadow-xl text-black mt-0 p-12 flex flex-col content-around sm:w-xtra sm:p-20 ">
                <h1 className="text-3xl font-bold mb-6 leading-none">Login</h1>
                <form className="mb-6">
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
                <button onClick={login} className="bg-blue-500 border border-rounded rounded-md p-2 text-white hover:bg-blue-400">Login</button>
            </div>
        </div>
    )    
    
    async function login(e) {
        try {
          await fire.login(email, password)
          checkInitialization()
          history.push("/");
        } catch(error) {
            if(error.code === "auth/invalid-email")
                alert('Please enter a valid email address')
            else 
                alert(error.message)
        }
    }
}

export default Login