/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from 'react'
import './Login.css'
import pic from '../../assets/default-pic.png'
import pass from '../../assets/password-image.png'
import { UserContext } from '../../App'
import Loader from "../Loader/Loader"

function Login(){
    const user = useContext(UserContext)
    const [isLogging,setIsLogging] = useState(false)
    const [userName, setUserName] = useState("");
    const [passWord, setPassword] = useState("");
    const [loginError,setLoginError] = useState(false)
    const [responseObject, setResponseObject] = useState({})
    if(loginError)
    window.alert("Enter correct credentials")
    //const [validUser, setValidUser]= useState(false)
    //you have written this async fetch function outside handle submit because you wanted to use it two times
    async function fetchResponse (){
        try{
            setIsLogging(true)
            //console.log(`${userName}`)
            //console.log(`${passWord}`)
            const response =await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: `${userName}`,
                    password: `${passWord}`,
                    // expiresInMins: 60, // optional
                    })
                })
                const loginResponse = await response.json()
                setResponseObject(responseObject => ({
                    ...loginResponse
                }))
                //console.log(responseObject)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLogging(false)
        }
    }
    // you have written this useEffect because the responseObject is
    // not being updated on the first API call of a user
    useEffect(()=>{
        console.log(responseObject)
        if(responseObject.message)
        {
            console.log("invalid response")
            user.setValid(false)
            setLoginError(true)
            //console.log(user.valid)
        }
        else
        {
            console.log("valid response")
            //setValidUser(true)
            user.setValid(true)
            if(user.loggedin<=2)
            user.setLoggedIn(++user.loggedin)
            //console.log(user.valid)
            const access = responseObject.token
            const id = responseObject.id
            localStorage.setItem("userId",id)
            localStorage.setItem("loginToken",access)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[responseObject])

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchResponse()
    }
    return (
        isLogging
        ?
        <div className='redirection'>
            You are being redirected
        <Loader/>
        </div>
        :
        <div className="Page">
            <form onSubmit={handleSubmit} className="LoginPage">
                <div className="heading">Account Login</div>
                <div className='input-container'>
                    <div className="icon">
                        <img src={pic} alt='user-image' className='user-pic'/>
                    </div>
                    <input type='text' 
                    placeholder='Enter your username' 
                    className='input'  
                    value="kminchelle"
                    onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <div className="icon">
                        <img src={pass} alt='password-image' className='pic'/>
                    </div>
                    <input type='password' 
                    placeholder='Enter you password' 
                    className='input' 
                    value="0lelplR"
                    onChange={(e)=>setPassword(e.target.value)}
                    />  
                </div>
                <div className="submit-button">
                    <button type='submit' className='submit-btn'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
