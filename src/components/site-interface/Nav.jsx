import downIcon from '../../assets/DownIcon.svg'


export default function Nav(){
    return <nav className='navList'>
    <ul className="flex flex-row gap-4">
        <li className=" flex flex-row">Shop <img src={downIcon} alt="" /></li>
        <li>On Sale</li>
        <li>New Arrivals</li>
        <li>Brands</li>
    </ul>
</nav>
}