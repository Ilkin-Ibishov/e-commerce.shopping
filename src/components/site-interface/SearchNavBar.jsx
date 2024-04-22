import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import requestFunction from "../SendRequest";

 const SearchNavBar= ({ setIsSpecificInputFocused })=> {
    const specificInputRef = useRef(null);
    const [inputValue, setInputValue] = useState('')
    const [productsData, setProductsData] = useState();
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [isFocused, setIsFocused] = useState(false)
    useEffect(()=>{
        const fetchProducts = async ()=>{
            setProductsData( await requestFunction({destination: "products", fetchMethod: "GET", id: '', data:undefined}))
        }
        fetchProducts();
    }, [])
    const handleSearching = async (event)=>{
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
        setIsFocused(document.activeElement === specificInputRef.current);
        setIsSpecificInputFocused(document.activeElement === specificInputRef.current);
    }
    
    const toLink=()=>{
        setSearchedProducts([])
        setInputValue('')
    }
    return (
        <div>
            <input
                ref={specificInputRef}
                onFocus={checkSpecificInputFocus}
                onBlur={checkSpecificInputFocus}
                onChange={handleSearching}
                type="search"
                className={`rounded-full h-12 px-10 pr-32 input-bg navList ] ${isFocused ? 'input-transition' : ''}`}
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

export default SearchNavBar;