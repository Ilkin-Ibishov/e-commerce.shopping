import SignUpLine from "./SignUpLine";
import NavigationBar from "./NavigationBar";
import { useState, useEffect, useRef } from "react";
import ProductDeleter from "../admin-panel/editing-product/DeleteProductFunction";
import { Link } from "react-router-dom";
import requestFunction from "../SendRequest";

export default function CartPage() {
    const [subtotal, setSubtotal] = useState(0)
    const [cartData, setCartData] = useState([]);
    const [discounts, setDiscounts] = useState([])
    const [selectedDiscount, setSelectedDiscount] = useState(0)
    let discountInput = useRef();
    
    useEffect(() => {
            fetchData()
            setSubtotal(s=>0)
            cartData.forEach((item)=>{
                setSubtotal(s=>s +=item.product.productPrice * item.amount)
            })
    }, [cartData]);
    const fetchCartProduct = async () =>{
        const fetchCartProduct = await requestFunction({destination: "cart", fetchMethod: "GET", id: '', data:undefined})
            setCartData(fetchCartProduct);
    }
    useEffect(()=>{
        fetchCartProduct()
    },[])
    let fetchData= ()=>{
        cartData.forEach((item, key) => {
            const fetchEachProduct = async () =>{
                let productId = item.productID;
                const fetchProductData = await requestFunction({destination: "products", fetchMethod: "GET", id: productId, data:undefined})
                cartData[key].productInfo = fetchProductData;
            }
        fetchEachProduct();
            }
    );
        const fetchDiscounts = async ()=>{
            const fetchProductData = await requestFunction({destination: "discounts", fetchMethod: "GET", id: '', data:undefined})
            setDiscounts(fetchProductData)
        }
        fetchDiscounts()
    }
    
    const handleCartProductDelete=(id)=>{
        setCartData(cartData.filter((e)=>e.id !== id))
    }

    const handleDiscount = () => {
        let text = discountInput.current.value;
        const foundDiscount = discounts.find(discount => discount.discountName === text);
        if (foundDiscount) {
          setSelectedDiscount(foundDiscount.discountPercent);
        } else {
          console.log("Discount code not found.");
          setSelectedDiscount([]);
        }
      };
    return (
        <>
            <SignUpLine />
            <NavigationBar />
            <h1 className="text-4xl font-bold px-20">Your Cart</h1>
            {cartData.length>0? 
            <div className="px-20 flex w-full gap-96">
                <div className="flex flex-row justify-start">
                    <div>
                        {cartData.map((item, key) => (
                            <div key={key} className=" flex py-5">
                                {item.productInfo && item.productInfo.productName ? 
                                <div className="flex flex-row gap-4 w-56">
                                    <img className=" w-32 h-32" src={item.productInfo.productImage} alt="" />
                                    <div className="relative m-2">
                                        <Link to={`/${item.productInfo.id}`}><span className=" absolute top-0 left-0 text-lg font-bold text-nowrap">{item.productInfo.productName}</span></Link>
                                        <span className=" absolute bottom-0 left-0 text-xl font-bold text-nowrap">${item.productInfo.productPrice}</span>
                                        <div onClick={()=>handleCartProductDelete(item.id)}><ProductDeleter direct={'cart'} productId={item.id} /></div>
                                        <span className=" absolute left-72 bottom-0">{item.amount}</span>
                                    </div>
                                </div>
                                : undefined}
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className=" flex flex-col">
                        <h3 className=" font-medium text-2xl">Order Summary</h3>
                        <div className=" my-8">
                        <div className="flex justify-between">
                                <span className="specificColor">Subtotal</span>
                                <span className=" right-0 font-semibold">${subtotal}</span>
                        </div>
                        {selectedDiscount>0?
                        <div className="flex justify-between">
                        <span className="specificColor">Discount (-{selectedDiscount}%)</span>
                        <span className=" right-0 font-semibold">-${subtotal*selectedDiscount/100}</span>
                        </div>:undefined}
                        <div className="flex justify-between">
                                <span className="specificColor">Delivery Fee</span>
                                <span className=" font-semibold">$15</span>
                        </div>
                        </div >
                        <div className="flex justify-between">
                                <span  className=" font-semibold text-xl">Total</span>
                                <span className=" font-semibold text-xl">${parseFloat((subtotal - subtotal*selectedDiscount/100 + 15).toFixed(2))}</span>
                        </div>
                        <div className="promo-code flex items-center py-4">
                            <input
                                ref={discountInput}
                                id="discount-input"
                                type="text"
                                className="border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                                placeholder="Add promo code"
                            />
                            <button onClick={()=>handleDiscount()} className="bg-black text-white py-2 px-4 rounded-r-lg hover:bg-gray-900">Apply</button>
                        </div>
                        <button className=" bg-black rounded-3xl text-white py-2">Go to Checkout</button>
                        </div>
                
            </div>:
            <span className="flex justify-center text-3xl font-extrabold">No product added to cart</span>
            }
        </>
    );
}
