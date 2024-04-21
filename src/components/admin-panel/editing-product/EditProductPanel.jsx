import React, { useState, useEffect } from "react";
import ProductTable from "../editing-product/ProductTable.jsx";
import requestFunction from "../../SendRequest.js";

const EditProductPanel = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await requestFunction({ destination: "products", fetchMethod: "GET", id: '', data: undefined });
                setProductData(productData);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const data = productData.map((item) => ({
        photo: item.productImage,
        name: item.productName,
        currentPrice: item.productPrice,
        oldPrice: item.productOldPrice,
        discount: item.productDiscountPercent,
        id: item.id
    }));

    return (
        <>
            <div className="flex justify-center pt-5">
                <ProductTable data={data} />
            </div>
        </>
    );
}

export default EditProductPanel;
