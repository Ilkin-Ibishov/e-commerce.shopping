import React, { useEffect, useState } from 'react';
import ProductDeleter from './DeleteProductFunction';
import Notification from '../Notification';
import GetProduct from './GetProduct';
import { deepCopy } from './DeepCopy';
import { Link } from "react-router-dom";

function MyTable({ data, fetchProductData, editableData }) {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        if (editableData === undefined) {
            setTableData(deepCopy(data));
        } else {
            setTableData(deepCopy(editableData));
        }
    }, [data, editableData]);

    const [showNotification, setShowNotification] = useState(false);
    const [editedRow, setEditedRow] = useState(null);

    function handleEdit(index) {
        setEditedRow(index);
        if(index === null){
            setTableData(data)
        }
    }

    function saveEdit() {
        setEditedRow(null);
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[editedRow] = deepCopy(newData[editedRow]); // Deep copy the edited row
            return newData;
        });
    }

    function changeInput(key, event) {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[editedRow][key] = event.target.value;
            return newData;
        });
    }

    function removeRow(item) {
        setTableData((prevData) => prevData.filter((column) => column.id !== item));
        setShowNotification(true);
    }
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            tableData[index].photo = reader.result
            console.log(index)
            setTableData(tableData)
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-2 py-1">Photo</th>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Current Price</th>
                        <th className="px-2 py-1">Old Price</th>
                        <th className="px-2 py-1">Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            {Object.entries(item).map(([key, value], i) => (
                                <td key={i} className="px-2 py-1">
                                    {key === 'id' ? (
                                        <div onClick={() => removeRow(value)}>
                                            <ProductDeleter direct={'products'} productId={value} fetchProductData={fetchProductData} />
                                        </div>
                                    ) : (
                                        typeof value === 'string' && key === 'photo' ? (
                                            editedRow === index ? <div className='flex flex-row'><img src={value} alt="" className="w-8 h-8 rounded" /><input onChange={(event)=>handleFileChange(event, index)} width="40px" height="40px"type="file" accept="image/*" src="" alt="" /></div> : <div><img src={value} alt="" className="w-8 h-8 rounded" /> </div>
                                        ) : (
                                            editedRow === index ?( key === "currentPrice" || key === "oldPrice" || key === "discount" ? <input className=' w-10 border border-black' onChange={(event) => changeInput(key, event)} defaultValue={value} />: <input className='border border-black' onChange={(event) => changeInput(key, event)} defaultValue={value} />) : (
                                                key === "name" ? <Link to={`/${item.id}`}><div className=' cursor-pointer underline text-blue-600'>{value}</div></Link>: value
                                                )
                                            )
                                    )}
                                </td>
                            ))}
                            <td>
                                {editedRow === index ? (
                                    <div className=' flex flex-row gap-5'>
                                        <div onClick={saveEdit}><GetProduct currentData={tableData[index]} id={tableData[index].id}  /></div> 
                                        <button onClick={() => handleEdit(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Notification message="Selected product deleted successfully" show={showNotification} onClose={() => setShowNotification(false)} />
        </div>
    );
}

export default MyTable;
