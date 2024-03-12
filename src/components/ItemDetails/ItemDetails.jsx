/* eslint-disable jsx-a11y/img-redundant-alt */
import './ItemDetails.css'
import { useState } from 'react'

function ItemDetails(props){
    const [cartClicked,setCartClicked] = useState(false)
    var [number,setNumber] = useState(0)
    async function AddToCart(){
        fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            products: [
            {
                id: props.pid,
                quantity: number,
            },
            {
                id: props.pid,
                quantity: number,
            },
            ]
        })
        })
    }
    return (
        <div className="item-details">
            <div className="product-image">
                <img src={props.picture} className='image-pic' alt='No detailed images for this product'/>
            </div>
            <div className="des">
            <div className="brand-title">
                <b>{props.brand}</b>{" "+props.title}
            </div>
            <div className="price">
                <b>Price: </b>{props.price}
            </div>
            <div className="rating">
                <b>Rating: </b>{props.rating}
            </div>
            <div className="details">
                "{props.details}"
            </div>
            <div className="cart-container">
            <div className="add-to-cart"
            onClick={()=>{
                AddToCart()
                setCartClicked(true)
            }}
            >
                Add to Cart
            </div>
            {
                cartClicked &&
                <div className='item-number'>
                <div className='decrement' onClick={()=>{
                    setNumber(number-1<0? 0: number-1)
                }}>-</div>
                <div className='item-quantity'>{number}</div>
                <div className='increment' onClick={()=>{
                    setNumber(number+1)
                }}>+</div>
                </div>
            }
            </div>
            </div>
        </div>
    )
}
export default ItemDetails
