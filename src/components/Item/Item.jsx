/* eslint-disable jsx-a11y/img-redundant-alt */
import './Item.css'
function Item({image,title,price,rating,itemId}){
    return (
        <div className="item-container">
            <div className="item-image">
                <img src={image} alt="image" className="image"/>
            </div>
            <div className="details">
                <div className="title">{title}</div>
                <div className="price">Price: {price}</div>
                <div className="rating">Rating: {rating}/5</div>
            </div>
        </div>
    )
}
export default Item