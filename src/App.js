import './App.css';
//import Login from './components/Login/Login'
//import Home from './components/Home/Home'
import RestrictedRoutes from './components/RestrictedRoutes/RestrictedRoutes'
// eslint-disable-next-line no-unused-vars
import Loader from './components/Loader/Loader'
import Cart from './components/Cart/Cart'
import { useState,createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

export const UserContext = createContext()

const UserContextProvider = ({children}) =>{
  const [valid,setValid] = useState(false)
  const [loggedin,setLoggedIn] = useState(0)
  return (
    <UserContext.Provider value={{valid,setValid,loggedin,setLoggedIn}}>
      {children}
    </UserContext.Provider>
  )
}

function App() {
  return (
    <div className="App">
        <UserContextProvider>
        <Routes>
          <Route path="/" element={<RestrictedRoutes/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        </UserContextProvider>
    </div>
  );
}

export default App;
