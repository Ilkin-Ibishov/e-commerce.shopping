import { NavLink } from "react-router-dom";

export default function AdminPanelEntrance({dest, text}){
    return <div className="sticky bottom-0 right-0">
        <NavLink to ={dest} className=" p-6 bg-slate-950 text-white rounded-lg ">{text}</NavLink>
    </div>
}