import {useState, useEffect} from 'react'
import TextFormBox from './TextFormBox/TextFormBox'
import useDidUpdateEffect from '../util/useDidUpdateEffect'
import './Login.css'

const Login = ({toggleLoginModal}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isMatchingPassword, setIsMatchingPassword] = useState(false)

    //Registration
    //TODO: Password rules validation
    //TODO: Verify Password
    //TODO: Check for email
    //TODO: Check for username
    //TODO: collapse animation and form swap on reg/login swap

    useEffect(() => {
        if(verifyPassword === '')
            return
        // console.log(password + " " + verifyPassword)
        if(password === verifyPassword)
            setIsMatchingPassword(true)
        else
            setIsMatchingPassword(false)
    }, [verifyPassword, password]);

    const loginUser = async() => {
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const data = await res.json();
        console.log(data)
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h1>{isLoginForm ? 'Login' : 'Sign Up'}</h1>
                <span className="exit" onClick={() => {toggleLoginModal()}}>X</span>
                {isLoginForm ?
                    <div id="loginForm">
                        <TextFormBox placeholder='username' title='Username' setText={setUsername}/>
                        <TextFormBox placeholder='password' title='Password' setText={setPassword}/>
                        <span style={{color: "blue"}} onClick={() => setIsLoginForm(false)}>I don't have an account</span>
                    </div>
                    :
                    <div className="registrationForm">
                        <TextFormBox placeholder='username' title='Username' setText={setUsername}/>
                        <TextFormBox placeholder='password' title='Password' setText={setPassword} checkmark={isMatchingPassword}/>
                        <TextFormBox placeholder='Verify Password' title='Verify Password' setText={setVerifyPassword} checkmark={isMatchingPassword}/>
                        <span style={{color: "blue"}} onClick={() => setIsLoginForm(true)}>I have an account</span>
                    </div>
                }
                <div>
                    <button onClick={loginUser}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default Login