import Login from '../Login/Login'
import Home from '../Home/Home'
import { UserContext } from '../../App'
import { useContext } from 'react'

function RestrictedRoutes(){
    const user = useContext(UserContext)
    console.log(user.valid)
    console.log(user.loggedin)
    //remove comments below
    if(user.valid && user.loggedin>=2)
    return <Home/>
    else
    return <Login/>
}

export default RestrictedRoutes