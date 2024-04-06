import ProductDataFetcher from "./ProductDataFetcher.jsx";
import React, { useState, useEffect } from "react";
import ProductTable from "./EditingProduct/ProductTable.jsx";

export default function EditProductPanel() {
    const [productData, setProductData] = useState([]);
    const data = productData.map((item, index) => ({
        photo: item.productImage,
        name: item.productName,
        currentPrice: item.productPrice,
        oldPrice: item.productOldPrice,
        discount: item.productDiscountPercent,
        id: item.id
    }));

    return (
        <>
            <ProductDataFetcher setData={setProductData} />
            <div className=" flex justify-center pt-5">
                <ProductTable data={data} />
            </div>
        </>
    );
}
