import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./RatingCode.jsx";
import ProductDataFetcher from "../ProductDataFetcher.jsx";
import requestFunction from "../SendRequest"

const HomeCatalog = () => {
    const [data, setData] = useState({});
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        const CatalogProducts = await requestFunction({destination: "homeCatalog", fetchMethod: "GET", id: '', data:undefined})
        setData(CatalogProducts.newArrivals)
        }
        fetchProducts();
    }, []);

    return (
        <>
            <ProductDataFetcher setData={setProductData} />
            <div className="text-center flex flex-col justify-center items-center">
                <div className="text-5xl font-bold my-10">{data.title}</div>
                <div className="grid lg:grid-cols-4 sm:grid-rows-4 gap-4 homeCatalogStyle">
                    {productData.map((product, idx) => (
                        <Link key={idx} to={`/${product.id}`}>
                            <div>
                                <img src={product.productImage} alt={product.productName} />
                                <div className="flex flex-col w-5/6 justify-start items-start">
                                    <span className="text-lg font-bold text-nowrap">{product.productName}</span>
                                    <span className="flex flex-row">
                                        <Rating ratingCount={product.productRating} />
                                        <span>{product.productRating}/5</span>
                                    </span>
                                    <div className="flex gap-4 justify-center items-center text-center">
                                        <span className="text-2xl font-semibold">${product.productPrice}</span>
                                        {product.productOldPrice !== 0 && (
                                            <span className="text-2xl font-bold oldPrice">${product.productOldPrice}</span>
                                        )}
                                        {product.productDiscountPercent !== 0 && (
                                            <span className="discount py-1 px-3 text-red-600">
                                                -{product.productDiscountPercent}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeCatalog;
