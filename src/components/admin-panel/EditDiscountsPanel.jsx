import { useEffect, useRef, useState } from "react";
import ProductDeleter from "./editing-product/DeleteProductFunction";
import requestFunction from "../SendRequest";

export default function EditDiscountsPanel() {
    const newDiscountName = useRef();
    const newDiscountPercent = useRef();
    const editedDiscountName = useRef();
    const editedDiscountPercent = useRef();
    const [discounts, setDiscounts] = useState([]);
    const [isAddNewActive, setAddNewActive] = useState(false)
    const [isEditOn, setEditOn] = useState(false)
    const [currentRow, setCurrentRow] = useState(undefined)
    const handleSaveNew= async()=>{
        let newDiscount = {
            discountName: newDiscountName.current.value,
            discountPercent: Number(newDiscountPercent.current.value)
        }
        await requestFunction({destination: "discounts", fetchMethod: "POST", id: '', data:newDiscount})
        handleAddNew()
        setDiscounts( await requestFunction({destination: "discounts", fetchMethod: "GET", id: '', data:undefined}))
    }
    const handleEditOn=(index)=>{
        setCurrentRow(index)
        setEditOn(!isEditOn)
    }
    useEffect(() => {
        const fetchDiscounts = async()=>{
            setDiscounts( await requestFunction({destination: "discounts", fetchMethod: "GET", id: '', data:undefined}))

        }
        fetchDiscounts()
    }, []);
    
    const handleAddNew=()=>{setAddNewActive(!isAddNewActive)}
    const handleSave=async(id)=>{
        let editedDiscount = {
            discountName: editedDiscountName.current.value,
            discountPercent: editedDiscountPercent.current.value
        }
        await requestFunction({destination: "discounts", fetchMethod: "PUT", id: id, data:editedDiscount})
        handleEditOn(undefined)
        setDiscounts( await requestFunction({destination: "discounts", fetchMethod: "GET", id: '', data:undefined}))
    }
    
    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-8 text-center">Current Discounts</h1>
            <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                    <span className="font-semibold">Name</span>
                    <span className="font-semibold pr-32">Percent</span>
                </div>
                <hr className="mb-4" />
                {discounts.map((item, index) => (
                    <div key={index} className="flex justify-between mb-4">
                        {currentRow===index?
                            <div className="w-full flex justify-between">
                                <input className="w-1/3 border border-gray-300 px-2 py-1" type="text" defaultValue={item.discountName} ref={editedDiscountName} />
                                <div>
                                    <input className="border border-gray-300 px-2 py-1" defaultValue={item.discountPercent} type="number" ref={editedDiscountPercent} />
                                    <button onClick={()=>handleSave(item.id)} className="px-4 py-1 bg-green-500 text-white ml-2">Save</button>
                                    <button onClick={()=>handleEditOn(undefined)} className="px-4 py-1 bg-red-500 text-white ml-2">Cancel</button>   
                                </div>
                            </div>:
                            <div className="w-full flex justify-between">
                                <span>{item.discountName}</span>
                                <div>
                                    <span className="px-4">{item.discountPercent}</span>
                                    <button onClick={()=>handleEditOn(index)} className="px-4 py-1 bg-blue-500 text-white mx-4">Edit</button>
                                    <span className=" cursor-pointer"><ProductDeleter direct={'discounts'} productId={item.id} /></span>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                {!isEditOn?
                !isAddNewActive? 
                    <button onClick={handleAddNew} className="bg-black text-white py-2 px-4 w-full mt-4">Add new</button>:
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <input ref={newDiscountName} className="border border-gray-300 px-2 py-1 w-1/3" type="text" />
                            <div className="flex justify-between w-1/4">
                                <input ref={newDiscountPercent} className="border border-gray-300 px-2 py-1 w-3/4" type="number" />
                                <button onClick={handleAddNew} className="px-4 py-1 bg-red-500 text-white ml-2">Cancel</button>
                            </div>
                        </div>
                        <button onClick={handleSaveNew} className="bg-green-500 text-white py-2 px-4 mt-4">Save new</button>
                    </div>
                :undefined
                }
            </div>
        </div>
    ); 
}
