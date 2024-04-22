import '../../App.css';
import imgLogo from '../../assets/SHOP.CO.svg'
import navbarPhone from '../../assets/NavbarPhone.svg'
import searchIcon from '../../assets/SearchIcon.svg'
import cartIcon from '../../assets/Cart.svg'
import accountLogo from '../../assets/AccountLogo.svg'
import SearchNavBar from './SearchNavBar';
import { useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import requestFunction from '../SendRequest';

export default function NavigationBar(){
    const [cartProductCount, setCartProductCount] = useState(0);
    const [isSpecificInputFocused, setIsSpecificInputFocused] = useState(false);
    const getCartProductCount = async ()=>{
        const cartProducts = await requestFunction({destination: "cart", fetchMethod: "GET", id: '', data:undefined})
        setCartProductCount(cartProducts.length)
    }
    getCartProductCount()
    return <div className="flex justify-between items-center h-24 bg-white sticky top-0 z-10 px-10">
    <div className="flex items-center gap-6">
        <img className="h-10 sm:hidden " src={navbarPhone} alt="Phone Icon" />
        <a href="/" className="flex-shrink-0 md:w-40 w-32">
            <img src={imgLogo} alt="Logo" className="h-10" />
        </a>
    </div>
    <Nav />
    <div className="flex items-center gap-6">
        <SearchNavBar setIsSpecificInputFocused={setIsSpecificInputFocused} />
        <Link to="/cart" className="relative">
            <img src={cartIcon} alt="Cart Icon" className="h-10" />
            {cartProductCount > 0 && (
                <span className="absolute top-0 left-4 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartProductCount}</span>
            )}
        </Link>
        <button className="flex items-center gap-2">
            <img src={accountLogo} alt="Account Icon" className="h-10" />
        </button>
    </div>
</div>

}