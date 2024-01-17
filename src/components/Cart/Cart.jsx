import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import CartItem from "../CartItem/CartItem.jsx"
import './Cart.css'

function Cart(){
    const id=localStorage.getItem("userId")
    const [loading, setLoading] = useState(true)
    const [cartProducts,setCartProducts] = useState([])
    useEffect(()=>{
        async function fetchCartProducts(){
            try{
                setLoading(true)
                const response = await fetch(`https://dummyjson.com/carts/${id}`)
                const cartResponse = await response.json()
                setCartProducts(cartProducts=>([
                    ...cartResponse.products
                ]))
                console.log(cartResponse)
                console.log("cart is this:")
                console.log(cartProducts.id)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        fetchCartProducts()
        console.log('useEffect')
        console.log(cartProducts.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartProducts.total])

    return (<div>
        <h2>Your Cart Details</h2>
        {
        loading
        ?
        <Loader/>
        :
        cartProducts.map((cartItem)=>(
            <CartItem
            title={cartItem.title}
            price={cartItem.price}
            quantity={cartItem.quantity}
            thumbnail={cartItem.thumbnail}
            />
        ))
        }
    </div>)
}
export default Cart