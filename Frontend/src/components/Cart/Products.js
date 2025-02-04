import React, { useState, useEffect } from 'react';
import axios from "axios";
const HOME_GARDEN = 'home and garden';
const UTILITY = 'utility';

export default function Products({ setCart, cart,restaurantID }) {
   

  const [products,setData] = useState([ ]);


  useEffect(() => {
    const fetchData = async () => {
        console.log("nmn rest ID:",restaurantID);
        var data = { params: { idRestaurants:restaurantID} };
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      const result =await axios.get("http://35.163.78.149:3001/getRestaurantDishes", data);
        console.log("products:",result.data.dishes);
      setData(result.data.dishes);
    };
 
     fetchData();
  }, []);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.Name === item.Name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {products.map((product, idx) => (
          <div className="product" key={idx}>
            <h3>Name : {product.Name}</h3>
            <h4>Price : ${product.Price}</h4>
            <h4>Ingredients : {product.Ingredients}</h4>
            <h4>Category : {product.Category}</h4>
            <img src={product.Image} alt={product.Name} />
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
