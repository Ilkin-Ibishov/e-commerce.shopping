import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignUpLine from './SignUpLine';
import NavigationBar from './NavigationBar';
import Rating from "./RatingCode";
import plusIcon from "../../assets/PlusCartButton.png"
import minusIcon from "../../assets/MinusCartButton.png"
import requestFunction from "../SendRequest";

export default function ProductPage() {
    const [increasedCount, setIncreasedCount] = useState(1);
    const [count, setCount] = useState(0);
    const { id }  = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        setCount(0);
        const fetchProductData = async ()=>{
            setProduct( await requestFunction({destination: "products", fetchMethod: "GET", id: id, data:undefined}))
        }
        fetchProductData();
    }, [id]);
    if (!product) {
        return <div>Loading...</div>;
    }
    const addToCart = async ()=>{
        if(count>0){
            function getProductInCart(item){
                return item.productID === product.id
            }
            let found = await requestFunction({destination: "cart", fetchMethod: "GET", id: "", data:undefined})
            found = found.find(getProductInCart)
            if(found === undefined){
                await requestFunction({destination: "cart", fetchMethod: "POST", id: "", data: {"productID": id,"amount": count,product}})
            }else{
                await requestFunction({destination: "cart", fetchMethod: "PUT", id: found.id, data: {"productID": id,"amount": count + found.amount,product}})
            }
        }
        setIncreasedCount(prevI=>prevI+1)
    }
    return (
        <>
            <SignUpLine />
            {increasedCount&&<NavigationBar />}
            <div className="flex flex-col sm:flex-row w-screen h-screen">
                <div className="sm:w-1/2 w-full flex justify-centee px-5"><img  className=" w-full h-full" src={product.productImage} alt={product.productName} /></div>
                <div className="sm:w-1/2 w-full px-5">
                    <h2 className="sm:text-4xl text-3xl font-bold">{product.productName}</h2>
                    <span className=" flex flex-row py-5">
                      <Rating ratingCount={product.productRating} />
                      <span>{product.productRating}/5</span>
                    </span>
                    <div className=" flex gap-4">
                      <span className="text-2xl font-semibold">${product.productPrice}</span>
                      {product.productOldPrice === 0 ? undefined :<span className="text-2xl font-bold oldPrice">${product.productOldPrice}</span> }
                      {product.productDiscountPercent === 0 ? undefined : <span className=" discount py-2 px-4 text-red-600">-{product.productDiscountPercent}%</span>}
                    </div>
                    <div className=" my-5">{product.productDescription}</div>
                    <div className="sm:mt-20 py-10 flex flex-row gap-4">
                        <div className="flex flex-row justify-center items-center buyCount gap-8 rounded-3xl px-4">
                            <button onClick={()=>takeCount((num)=>num>0 ? --num : 0)} className=" text-lg"><img src={minusIcon} alt="" /></button>
                            <div className=" text-lg font-medium">{count}</div>
                            <button onClick={()=>setCount((num)=>++num)} className=" text-lg"><img src={plusIcon} alt="" /></button>
                        </div>
                        <span onClick={()=>addToCart()} className="sm:px-28 px-5 py-4 border-black rounded-full bg-black border-2 text-white w-fit cursor-pointer duration-500 focus:bg-red-700 hover:bg-slate-700 hover:text-white text-nowrap">Add To Cart</span>
                    </div>
                </div>
            </div>
        </>
    );
}
