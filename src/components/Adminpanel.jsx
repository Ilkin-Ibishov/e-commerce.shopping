
import AdminPanelEntrance from "./AdminPanelEntrance";
import AddProductPanel from "./AddProductPanel";
import EditProductPanel from "./EditProductPanel";
import { useState } from "react";
import EditDiscountsPanel from "./EditDiscountsPanel";
export default function AdminPanel() {
    const panelNavClassName = "cursor-pointer font-semibold text-lg p-6 border-4 rounded-r-md w-full h-fit border-white"
    const panelScreen = {
        "add": <AddProductPanel />,
        "edit": <EditProductPanel />,
        "discounts": <EditDiscountsPanel />
    }
    const [currentPanel, setCurrentPanel] = useState(panelScreen.add)
    function handlePanel(chosen){
        setCurrentPanel(chosen)
    }
    
    return (
        <>
        <div className="flex flex-row">
            <div className="w-1/4 bg-gray-900 h-screen rounded-e-lg text-white py-10 flex flex-col items-center text-left">
                <div className=" w-56 gap-5 flex flex-col text-center">
                    <div onClick={()=>handlePanel(panelScreen.add)} className={panelNavClassName}>Add new product</div>
                    <div onClick={()=>handlePanel(panelScreen.edit)} className={panelNavClassName}>Edit product</div>
                    <div onClick={()=>handlePanel(panelScreen.discounts)} className={panelNavClassName}>Edit Discounts</div>
                </div>
            </div>
            <div className=" w-3/4">
                {currentPanel}
                <div className=" absolute right-0 bottom-10">
                    <AdminPanelEntrance className=" absolute right-0" dest="/" text="Go to Home page" />
                </div> 
            </div>            
        </div>
                        
        </>
    );
}
