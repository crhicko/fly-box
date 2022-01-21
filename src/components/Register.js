import {useState} from 'react'

const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')

    const registerUser = async () => {
        console.log("posting")
        const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: registerUsername,
                password: registerPassword,
                email: registerEmail
            })
        });
        const data = await res.json();
        console.log(data)

    }


    return (
        <div>
            <h1>Register</h1>
            <input placeholder='email' onChange={(e) => setRegisterEmail(e.target.value)}/>
            <input placeholder='username' onChange={(e) => setRegisterUsername(e.target.value)}/>
            <input placeholder='password' onChange={(e) => setRegisterPassword(e.target.value)}/>
            <button onClick={registerUser}>Submit</button>
        </div>
    )
}

export default Register