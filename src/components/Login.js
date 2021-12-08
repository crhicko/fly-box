import {useState} from 'react'

const Login = () => {
    const [loginUsername, setloginUsername] = useState('')
    const [loginPassword, setloginPassword] = useState('')



    return (
        <div>
            <h1>login</h1>
            <input placeholder='username' onChange={(e) => setloginUsername(e.target.value)}/>
            <input placeholder='password' onChange={(e) => setloginPassword(e.target.value)}/>
            <button>Submit</button>
        </div>
    )
}