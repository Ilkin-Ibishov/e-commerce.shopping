import { useState, useRef } from "react";
import ProductDataFetcher from "../ProductDataFetcher";
import { Link } from "react-router-dom";

export default function SearchNavBar({ setIsSpecificInputFocused }) {
    const specificInputRef = useRef(null);
    const [inputValue, setInputValue] = useState('')
    const [productsData, setProductsData] = useState();
    const [searchedProducts, setSearchedProducts] = useState([]);
    
    function searching(event) {
        const newValue = event.target.value;
        setInputValue(newValue)
        if (newValue !== ''){
            let filteredProducts = productsData.filter(item =>
                item.productName.toLowerCase().includes(newValue.toLowerCase())
            );
            setSearchedProducts(filteredProducts);
        } else {
            setSearchedProducts([]);
        }
    }
    const checkSpecificInputFocus = () => {
        const isFocused = document.activeElement === specificInputRef.current;
        setIsSpecificInputFocused(isFocused);
    }
    
    const toLink=()=>{
        setSearchedProducts([])
        setInputValue('')
    }
    return (
        <div>
            <ProductDataFetcher setData={setProductsData} />
            <input
                ref={specificInputRef}
                onFocus={checkSpecificInputFocus}
                onBlur={checkSpecificInputFocus}
                onChange={searching}
                type="search"
                className={`rounded-full h-12 px-10 input-bg navList w-full ${document.activeElement === specificInputRef.current ? 'inputWidth input-transition' : 'input-transition'}`}
                placeholder="Search for products..."
                value={inputValue}
            />
            {searchedProducts.length > 0 ? (
                <div  className=" bg-white text-black h-48 absolute w-full overflow-y-auto border-4">
                    {searchedProducts.map((item, key) => (
                        <Link onClick={toLink} key={key} to={`/${item.id}`}>
                            <div className=" p-4 flex flex-row gap-3">
                                <div className=" w-10 h-10">
                                    <img src={item.productImage} alt="" />
                                </div>
                                <div>
                                    <div className=" text-sm">{item.productName}</div>
                                </div>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            ) : null}
        </div>
    );
}