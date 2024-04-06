import '../App.css';
import imgLogo from '../assets/SHOP.CO.svg'
import navbarPhone from '../assets/NavbarPhone.svg'
import searchIcon from '../assets/SearchIcon.svg'
import cartIcon from '../assets/Cart.svg'
import accountLogo from '../assets/AccountLogo.svg'
import SearchNavBar from './SearchNavBar';
import { useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function NavigationBar(){
    const [cartProductCount, setCartProductCount] = useState(0);
    const [isSpecificInputFocused, setIsSpecificInputFocused] = useState(false);
    fetch("http://localhost:3000/productAmount", { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.json())
            .then((data) => {
                setCartProductCount(data.amount)
            }
            )
    return <div className=" h-24 flex flex-row nav-padding items-center gap-24 w-full sticky top-0 bg-white z-10">
        <img className="nav-phone" src={navbarPhone} alt="" />
        <a href="/"><img  src={imgLogo} alt="" height="22px" width={"160px"} /></a>
        <Nav />
        <div className=" flex flex-row relative items-center navList">
            <img src={searchIcon} alt="" className=" absolute left-2 " />
            <SearchNavBar setIsSpecificInputFocused={setIsSpecificInputFocused} />
        </div>
        {
            isSpecificInputFocused===false?
        <div className="flex flex-row gap-4 relative">
            <img src={searchIcon} alt="" className="relative left-2 sm:hidden" />
            <Link to={"/cart"}><img src={cartIcon} alt="" height="24px" width={"24px"} /></Link>
            {
                cartProductCount >0?<span className=' absolute left-4 top-2 bg-red-500 text-white rounded-full p-1 m-0 text-xs leading-none'>{cartProductCount}</span>:undefined
            }
            
            <img src={accountLogo} alt="" height="24px" width={"24px"} />
        </div>:undefined
        }
    </div>
}