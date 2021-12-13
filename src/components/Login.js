import {useState} from 'react'

const Login = () => {
    const [loginUsername, setloginUsername] = useState('')
    const [loginPassword, setloginPassword] = useState('')

    const loginUser = async() => {

        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword,
            })
        });
        const data = await res.json();
        console.log(data)
    }

    return (
        <div>
            <h1>Login</h1>
            <input placeholder='username' onChange={(e) => setloginUsername(e.target.value)}/>
            <input placeholder='password' onChange={(e) => setloginPassword(e.target.value)}/>
            <button onClick={loginUser}>Submit</button>
        </div>
    )
}

export default Login