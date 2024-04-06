import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignUpLine from './SignUpLine';
import NavigationBar from './NavigationBar';
import Rating from "./RatingCode";
import plusIcon from "../assets/PlusCartButton.png"
import minusIcon from "../assets/MinusCartButton.png"
import PostToCart from "./PostToCart";

export default function ProductPage() {
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        setCount(0);
        fetch(`http://localhost:3000/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const addToCart= async ()=>{
        if(count>0){
            
            PostToCart().getCartData().then((e)=>{
            function getProductInCart(item){
                return item.productID === product.id
            }
            let found = e.find(getProductInCart)
            if(found === undefined){
                PostToCart().setCartProductSAmount({condition: true})
                PostToCart().setCartData({ data: {
                    "productID": id,
                    "amount": count,
                    product
                } });
            }else{
                PostToCart().setCartProductAmount({
                    data: {
                        "productID": id,
                        "amount": count + found.amount,
                        product
                    },
                    id: found.id
                })
            }
            })
        }
    }
    return (
        <>
            <SignUpLine />
            <NavigationBar />
            <div className="flex flex-row">
                <div className="w-1/2 flex justify-center"><img width={"444px"} height={"530px"} src={product.productImage} alt={product.productName} /></div>
                <div className="w-1/2 px-5">
                    <h2 className="text-4xl font-bold">{product.productName}</h2>
                    <span className=" flex flex-row my-5">
                      <Rating ratingCount={product.productRating} />
                      <span>{product.productRating}/5</span>
                    </span>
                    <div className=" flex gap-4">
                      <span className="text-2xl font-semibold">${product.productPrice}</span>
                      {product.productOldPrice === 0 ? undefined :<span className="text-2xl font-bold oldPrice">${product.productOldPrice}</span> }
                      {product.productDiscountPercent === 0 ? undefined : <span className=" discount py-2 px-4 text-red-600">-{product.productDiscountPercent}%</span>}
                    </div>
                    <div>{product.productDescription}</div>
                    <div className="mt-20 flex flex-row gap-4">
                        <div className="flex flex-row justify-center items-center buyCount gap-8 rounded-3xl px-4">
                            <button onClick={()=>takeCount((num)=>num>0 ? --num : 0)} className=" text-lg"><img src={minusIcon} alt="" /></button>
                            <div className=" text-lg font-medium">{count}</div>
                            <button onClick={()=>setCount((num)=>++num)} className=" text-lg"><img src={plusIcon} alt="" /></button>
                        </div>
                        <span onClick={()=>addToCart()} className="px-28 py-4 border-black rounded-full bg-black border-2 text-white w-fit cursor-pointer duration-500 focus:bg-red-700 hover:bg-slate-700 hover:text-white">Add To Cart</span>
                    </div>
                </div>
            </div>
        </>
    );
}
