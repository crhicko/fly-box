import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext'
import { useFormik } from 'formik'
import { validateUserName, validateLoginPassword } from '../util/Validator'
import './Login.css'

const Login = () => {
    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isMatchingPassword, setIsMatchingPassword] = useState(false)
    const [fetchError, setFetchError] = useState(undefined)

    const { user, setUser } = useContext(UserContext)

    const validate = values => {
        let errors = {}
        errors = {...validateUserName(values.username), ...errors}
        errors = {...validateLoginPassword(values.password), ...errors}
        return errors
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            loginUser(values.username, values.password)
        },
        validate
    })

    //Registration
    //TODO: Password rules validation
    //TODO: Verify Password
    //TODO: Check for email
    //TODO: Check for username
    //TODO: collapse animation and form swap on reg/login swap

    useEffect(() => {
        if (verifyPassword === '')
            return
        // console.log(password + " " + verifyPassword)
        if (password === verifyPassword)
            setIsMatchingPassword(true)
        else
            setIsMatchingPassword(false)
    }, [verifyPassword, password]);

    const loginUser = async (user, pass) => {
        setFetchError(undefined)
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass,
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.id) {
            setUser(data)
            navigate('/flies');
        }
        else {
            setFetchError(data.message);
        }

    }

    return (
        <div style={{ textAlign:'center'}}>
            <div className="rounded-box" style={{width:"max(25vw,300px)", display: "inline-block"}}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-row">
                        <h3>Username</h3>
                        <input id="username" name="username" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username}/>
                        {formik.touched.username && formik.errors.username ? (
                            <div className='form-error'>{formik.errors.username}</div>
                        ): null}
                    </div>
                    <div className="form-row">
                        <h3>Password</h3>
                        <input id="password" name="password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='form-error'>{formik.errors.password}</div>
                        ): null}

                    </div>
                    <button type="submit">Submit</button>
                    {fetchError ? <div className='form-error'>{fetchError}</div> : null}
                </form>
            </div>
        </div>
    )
}

export default Login