import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import fire from "../config/fire"


function Login({checkInitialization}) {

    const [modalOpen, setModalOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();

    function handleChange(e){
        let {value} = e.target.value
        if(e.target.type === "email") 
            setEmail(value)
        else setPassword (value)
    }

    return (
        <div>
            <div isOpen={modalOpen} className="bg-gray-700 w-64 rounded text-white m-auto mt-4 p-4">
                <form>
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
                           onChange={(e) => setPassword(e.target.value)}                      // this cant be okay....
                           value={password}
                           />
                </form>
                <button className="bg-blue-500 p-2 m-2" onClick={login}>Log In</button>
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