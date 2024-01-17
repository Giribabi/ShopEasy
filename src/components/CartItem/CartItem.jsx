import './CartItem.css'

function CartItem(props){
    return (
        <div className="cart-product">
            <div className="cart-image">
            <img src={props.thumbnail} alt="no cart-product thumbnail" className='cart-thumbnail'/>
            </div>
            <div className="info">
                <div className="title">
                    {props.title}
                </div>
                <div className="price">
                    Rs.{props.price}/-
                </div>
                <div className="quantity">
                    Quantity: {props.quantity}
                </div>
            </div>
        </div>
    )
}
export default CartItem