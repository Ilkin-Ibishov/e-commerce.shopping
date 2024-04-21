import { selectClasses } from "@mui/material";
import { useEffect } from "react";


export default function GetProduct({id, currentData, selectedProduct, updatedData}){
    useEffect(() => {
        if(updatedData === undefined && selectedProduct === undefined){
            selectedProduct = {}
            updatedData = {}
        }
    }, [selectedProduct, updatedData]);
    
    fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                selectedProduct = data.find((item) => item.id === id);
                return selectedProduct
            })
            .catch((error) => console.error("Error fetching product:", error));
    const editProduct = async () =>{
        updatedData = {productImage: currentData.photo, productName: currentData.name, productPrice: currentData.currentPrice, productOldPrice: currentData.oldPrice, productDiscountPercent: currentData.discount, productRating: selectedProduct.productRating, productDescription: selectedProduct.productDescription}
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
    }
    return <button onClick={editProduct}>Save</button>
}