import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext'
import { useFormik } from 'formik'
import { validateUserName, validateLoginPassword, validateEmail, validateRegistrationPassword } from '../util/Validator'
import Loader from '../util/Loader/Loader'
import './Login.css'

//TODO:
//limit characters in username creation, no at no ticks all that

const Login = () => {
    let navigate = useNavigate()

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [fetchError, setFetchError] = useState(undefined)

    const { user, setUser } = useContext(UserContext)

    const validate = values => {
        let errors = {}
        errors = {...validateUserName(values.username), ...errors}
        if(!isLoginForm)
            errors = {...validateEmail(values.email), ...errors}
        errors = isLoginForm ? {...validateLoginPassword(values.password), ...errors} : {...validateRegistrationPassword(values.password, values.confirm_password), ...errors}
        return errors
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirm_password: '',
            email: ''
        },
        onSubmit: values => {
            isLoginForm ? loginUser(values.username, values.password) : registerUser(values.username, values.password, values.email)
        },
        validate
    })

    const loginUser = async (user, pass) => {
        setFetchError(undefined)
        setIsLoggingIn(true)
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/login', {
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
            if (res.ok) {
                setUser(data)
                navigate('/flies');
            }
            else {
                setFetchError(data.message);
            }
        } catch (error) {
            console.error(error)
            setFetchError('Something went wrong logging in.')
        }
        setIsLoggingIn(false)
    }

    const registerUser = async (user, pass, email) => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                email: email,
                password: pass,
            })
        })
        const data = await res.json();
        // console.log(data)
        if (data.id) {
            // setUser(data.id)
            loginUser(user, pass)
        }
        else {
            setFetchError(data.message);
        }
    }

    const toggleLoginForm = () => {
        setIsLoginForm(!isLoginForm)
    }

    return (
        <div className="wave-bg splash" style={{ textAlign:'center'}}>
            <div className="rounded-box" style={{width:"max(25vw,300px)", display: "inline-block", backgroundColor:'var(--bg-color-dark-secondary)'}}>
                {isLoggingIn ? <Loader style={{textAlign: 'center', margin: 'auto'}}/> :
                <form className='login-form' onSubmit={formik.handleSubmit}>
                    <h1>{isLoginForm ? 'Log In' : 'Sign Up'}</h1>
                    {!isLoginForm && <div className="form-row">
                        <input id="email" name="email" type="text" placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? (
                            <div className='form-error'>{formik.errors.email}</div>
                        ): null}
                    </div>}
                    <div className="form-row">
                        <input id="username" name="username" type="text" placeholder="Username" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username}/>
                        {formik.touched.username && formik.errors.username ? (
                            <div className='form-error'>{formik.errors.username}</div>
                        ): null}
                    </div>
                    <div className="form-row">
                        <input id="password" name="password" type="password" placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='form-error'>{formik.errors.password}</div>
                        ): null}
                    </div>
                    {!isLoginForm && <div className="form-row">
                        <input id="confirm_password" name="confirm_password" type="password" placeholder='Confirm Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirm_password}/>
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <div className='form-error'>{formik.errors.confirm_password}</div>
                        ): null}
                    </div>}
                    <div className='form-row'>
                        <button className='btn text-med' type="submit">Submit</button>
                    </div>
                    <div className="form-row">
                        <a className='change-form' onClick={toggleLoginForm}>{isLoginForm ? "Don't Have an Account? Sign Up Here!" : "I Have an Account, Let me Log In!"}</a>
                    </div>
                    {fetchError ? <div className='form-error'>{fetchError}</div> : null}
                </form>
                }
            </div>
        </div>
    )
}

export default Login