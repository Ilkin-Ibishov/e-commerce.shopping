import React, { useEffect } from "react";

const CartDataFetcher = ({ setData }) => {
    useEffect(() => {
        fetch("http://localhost:3000/cart")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error("Error fetching product data:", error));
    }, [setData]);

    return null;
};

export default CartDataFetcher;
