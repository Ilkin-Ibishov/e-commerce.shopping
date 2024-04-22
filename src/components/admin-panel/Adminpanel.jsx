import AdminPanelEntrance from "./AdminPanelEntrance";
import AddProductPanel from "./AddProductPanel";
import EditProductPanel from "./editing-product/EditProductPanel";
import { useState } from "react";
import EditDiscountsPanel from "./EditDiscountsPanel";
export default function AdminPanel() {
    const panelNavClassName = `cursor-pointer font-semibold text-lg p-6 border-4 rounded-r-md w-full h-fit border-white `
    const panelNavClassNameCheck = `cursor-pointer font-semibold text-lg p-6 border-4 rounded-r-md w-full h-fit border-white bg-gray-600`

    const panelScreen = {
        "add": <AddProductPanel />,
        "edit": <EditProductPanel />,
        "discounts": <EditDiscountsPanel />,
        "none": <div className=" font-bold text-center text-3xl relative top-52">Choose a panel</div>
    }
    const [currentPanel, setCurrentPanel] = useState(panelScreen.none)
    const [currentPanelCheck, setCurrentPanelCheck] = useState("")

    function handlePanel(chosen,checkPanel){
        setCurrentPanel(chosen)
        setCurrentPanelCheck(checkPanel)
    }
    return (
        <>
        <div className="flex flex-row">
            <div className="w-1/4 bg-gray-900 h-screen rounded-e-lg text-white py-10 flex flex-col items-center text-left">
                <div className=" w-56 gap-5 flex flex-col text-center">
                    <div onClick={()=>handlePanel(panelScreen.add,'add')} className={currentPanelCheck === "add" ?panelNavClassNameCheck:panelNavClassName }>Add new product</div>
                    <div onClick={()=>handlePanel(panelScreen.edit, 'edit')} className={currentPanelCheck === "edit" ?panelNavClassNameCheck:panelNavClassName}>Edit product</div>
                    <div onClick={()=>handlePanel(panelScreen.discounts, 'discounts')} className={currentPanelCheck === "discounts"?panelNavClassNameCheck:panelNavClassName}>Edit Discounts</div>
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
