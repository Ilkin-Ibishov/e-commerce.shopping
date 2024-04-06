import Notification from './Notification';
import { useState } from "react";
import FetchData from "./PostProduct";

export default function AddProductPanel(){
    const [showNotification, setShowNotification] = useState(false);
    
    // New product data
    const [newProductData, setNewProductData] = useState({
        productImage: "",
        productName: "",
        productDescription: "",
        productRating: 0.0,
        productPrice: "",
        productDiscountPercent: 0,
        productOldPrice: "",
    });

    // Function to handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        const reader = new FileReader(); // Create a FileReader object

        // Callback function to handle FileReader onload event
        reader.onload = () => {
            // Set the product image to the base64 encoded data URL
            setNewProductData({
                ...newProductData,
                productImage: reader.result
            });
        };

        // Read the selected file as data URL
        reader.readAsDataURL(file);
    };


    // Function to handle form submission
    const postNewProduct = (event) => {
        const percent = parseInt(newProductData.productOldPrice) > 0 ? 100 - (parseInt(newProductData.productPrice) * 100 / parseInt(newProductData.productOldPrice)) : 0;
        const updatedProductData = { ...newProductData, productDiscountPercent: percent };
        setNewProductData(updatedProductData);
        event.preventDefault();
        FetchData({ newProductData: updatedProductData });
        setShowNotification(true);
        // Reset form fields after submission
        setNewProductData({
            ...newProductData,
            productName: "",
            productRating: 0.0,
            productPrice: "",
            productImage: "",
            productDescription: "",
            productOldPrice: "",
            productDiscountPercent: 0
        });
    };



    return <div className="flex pt-10 pl-10">
    <form className="flex flex-col style-form" onSubmit={postNewProduct}>
            <label>Product name:</label>
            <input
                type="text"
                required
                onChange={(e) => setNewProductData({ ...newProductData, productName: e.target.value })}
                value={newProductData.productName}
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <label>Product description:</label>
            <textarea
                type="text"
                required
                onChange={(e) => setNewProductData({ ...newProductData, productDescription: e.target.value })}
                value={newProductData.productDescription}
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <label>Product rating:</label>
            <input
                type="decimal"
                required
                onChange={(e) => setNewProductData({ ...newProductData, productRating: e.target.value })}
                value={newProductData.productRating}
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <label>Product current price:</label>
            <input
                type="number"
                required
                onChange={(e) => setNewProductData({ ...newProductData, productPrice: e.target.value })}
                value={newProductData.productPrice}
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <label>Product old price:</label>
            <input
                type="number"
                required
                onChange={(e) => setNewProductData({ ...newProductData, productOldPrice: e.target.value })}
                value={newProductData.productOldPrice}
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <label>Product photo:</label>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                className='focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            />
            <button className=' p-5 bg-black text-white hover:bg-gray-700' type="submit">Submit</button>
        </form>
        <Notification message="New product added to catalog" show={showNotification} onClose={() => setShowNotification(false)} />
    </div>
}