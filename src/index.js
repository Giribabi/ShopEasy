//App deployed at https://giribabi-shopeasy-updated2.surge.sh/

/*
Documentation:
The login username and password can be found in https://dummyjson.com/users
Example of a username: atuny0
Its password is: 9uQFF1Lh
We must remember that accurate login username and pass are necessary to enter into the home page.
I have collected and used all the data from https://dummyjson.com/docs
This project is a e-commerce website which I have named as Shopeasy.
After the login authentication, you will be redirected to the protected Home page.
Then you can search for the available products.
You can filter the products according to their price.
You can view the number of items added to cart at the top of the cart icon.
The total cost of the items in the cart is found below the cart icon.
You can view the cart by clicking on the cart icon.
You can also tap on any item card on the home page to view its complete description.
At last you can logout from the session by clicking the logout button.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
