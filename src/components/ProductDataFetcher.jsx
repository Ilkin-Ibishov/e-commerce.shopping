import React, { useEffect } from "react";

const ProductDataFetcher = ({ setData }) => {
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error("Error fetching product data:", error));
    }, [setData]);

    return null;
};

export default ProductDataFetcher;
