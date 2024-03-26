/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Item from "../Item/Item";
import ItemDetails from "../ItemDetails/ItemDetails";
import "./Home.css";
import picture from "../../assets/password-image.png";
import cart from "../../assets/cart.png";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

/*
You can submit a short assignment 
1. done---Implement Login process using (https://dummyjson.com/docs/auth), 
2. done---Save the login token for authorization purpose. 
3. done---Make Home page as protected Route (only logged in users allowed). 
4. done---Fetch products on home page ( https://dummyjson.com/docs/products) 
5. done---Add a search on the page to search products based on their name.
6. done---Add a filter option on the home page based on price.
7. done---Implement a cart and show the cart count on the top with the total amount of the cart.
8. done---Create add to cart button on product cards.
*/
function Home() {
    //conditional styling in react.js
    const user = useContext(UserContext);
    const id = localStorage.getItem("userId");
    const [error, setError] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [pic, setPic] = useState(picture);
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [brand, setBrand] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(10000);
    const [pid, setPid] = useState(-1);
    const [filterApplied, setFilterApplied] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    console.log(filterOpen);
    const handleLogOut = () => {
        user.setValid(false);
        user.setLoggedIn(0);
        localStorage.removeItem("loginToken");
    };
    function fetchFilteredProducts() {
        const filteredProducts = products.filter((product) => {
            if (product.price >= low && product.price <= high) return product;
            return "";
        });
        console.log(filteredProducts);
        setProducts(filteredProducts);
        setIsSelected(false);
    }
    const handleFilter = (e) => {
        e.preventDefault();
        setFilterApplied(true);
        fetchFilteredProducts();
        setFilterOpen(false);
    };
    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/products");
            const responseProducts = await response.json();
            console.log("response products");
            setProducts((products) => [...responseProducts.products]);
            console.log("api response");
            console.log(products);
        } catch (err) {
            console.log("no internet");
            setError(true);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
        console.log("useEffect");
        //console.log(products)
        console.log(products.total);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products.total]);
    // you put products.total to only call the useEffect when products.total changes
    // if you are putting products as [dependency], the useEffect is being called infinite times

    const [cartProducts, setCartProducts] = useState({});
    useEffect(() => {
        async function fetchCartProducts() {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/carts/${id}`
                );
                const cartResponse = await response.json();
                setCartProducts((cartProducts) => ({
                    ...cartResponse,
                }));
            } catch (err) {
                setError(true);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCartProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartProducts.total]);

    return error ? (
        <Error />
    ) : (
        <div className="home-container">
            <div className="heading-container">
                <div className="heading-name">Welcome to ShopEasy</div>
            </div>
            <div className="header">
                <div className="cart">
                    <div className="cart-quantity">
                        Items:{" "}
                        {cartProducts.totalQuantity === undefined
                            ? 0
                            : cartProducts.totalQuantity}
                    </div>
                    <Link to="/cart">
                        <img src={cart} alt="cart" className="cart-logo" />
                    </Link>
                    <div className="cart-total">
                        Rs.
                        {cartProducts.total === undefined
                            ? 0
                            : cartProducts.total}
                    </div>
                </div>
                {/*****you have added the id here to show the selected item clearly */}
                <div className="search" id="item-show">
                    <input
                        type="search"
                        placeholder="Search Products"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="search-bar"
                    />
                    <div className="search-list">
                        {!loading &&
                            searchInput !== "" &&
                            products
                                .filter((product) => {
                                    if (
                                        product.title
                                            .toLowerCase()
                                            .includes(searchInput.toLowerCase())
                                    )
                                        return product;
                                    return "";
                                })
                                .slice(0, 5)
                                .map((product) => (
                                    <div
                                        key={`${product.id}`}
                                        className="search-item"
                                        onClick={() => {
                                            setIsSelected(true);
                                            setBrand(product.brand);
                                            setDescription(product.description);
                                            setPic(product.images[1]);
                                            setPrice(product.price);
                                            setRating(product.rating);
                                            setTitle(product.title);
                                            setPid(product.id);
                                            console.log("search-item selected");
                                        }}
                                    >
                                        {product.title}
                                    </div>
                                ))}
                    </div>
                </div>
                <div className="rest-header">
                    <div className="filter">
                        <div
                            className="filter-button"
                            onClick={() => {
                                setFilterOpen(true);
                                console.log(filterOpen);
                            }}
                        >
                            Filter
                        </div>
                        {filterOpen && (
                            <form
                                onSubmit={handleFilter}
                                className="filter-form"
                            >
                                <div className="low">
                                    Low-range:
                                    <input
                                        type="number"
                                        style={{ width: "60%" }}
                                        className="input-range"
                                        onChange={(e) => {
                                            setLow(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="high">
                                    Higher-range:
                                    <input
                                        type="number"
                                        style={{ width: "60%" }}
                                        className="input-range"
                                        onChange={(e) => {
                                            setHigh(e.target.value);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="filter-submit-button"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        setLow(0);
                                        setHigh(10000);
                                        fetchProducts();
                                    }}
                                    className="filter-submit-button"
                                >
                                    Remove-filters
                                </button>
                            </form>
                        )}
                    </div>
                    <div onClick={handleLogOut} className="logout">
                        Logout
                    </div>
                </div>
            </div>
            <div className="item-show">
                {isSelected && (
                    <ItemDetails
                        title={title}
                        picture={pic}
                        brand={brand}
                        rating={rating}
                        price={price}
                        details={description}
                    />
                )}
            </div>
            <div className="products-cards">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="products-grid-container">
                        {products.length === 0 ? (
                            <h2 className="no-products">
                                Oops! No Products to display in the given price
                                range
                            </h2>
                        ) : (
                            <div className="products">
                                {products.map((product, index) => (
                                    <a href="#item-show">
                                        <div
                                            key={product.brand + `${index}`}
                                            onClick={() => {
                                                setIsSelected(true);
                                                setBrand(product.brand);
                                                setDescription(
                                                    product.description
                                                );
                                                setPic(product.images[1]);
                                                setPrice(product.price);
                                                setRating(product.rating);
                                                setTitle(product.title);
                                                setPid(product.id);
                                                console.log(
                                                    "home-page-item selected"
                                                );
                                            }}
                                        >
                                            <Item
                                                key={`${product.id}`}
                                                itemId={product.id}
                                                title={product.title}
                                                price={product.price}
                                                image={product.thumbnail}
                                                rating={product.rating}
                                                pid={pid}
                                                className="item-container"
                                            />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
export default Home;
