
export default function DiscountFunctions(){
    let addNewDiscount=({newDiscountData})=>{
        fetch('http://localhost:3000/discounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscountData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }
    let editCurrentDiscount=({data, id})=>{
        fetch(`http://localhost:3000/discounts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    }

    return {addNewDiscount, editCurrentDiscount}
}