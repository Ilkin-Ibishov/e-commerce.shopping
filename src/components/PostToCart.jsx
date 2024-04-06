
export default function PostToCart() {
   let getCartData = ()=>{
     return fetch("http://localhost:3000/cart", { method: 'GET', headers: {  'Content-Type': 'application/json'},})
            .then((response) => response.json())
            .then((response) => response)
            .catch((error) => console.error("Error fetching product data:", error));
        }

    let setCartData =({data})=>{
      fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
    let setCartProductAmount = ({id, data}) =>{
        fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    }
    let setCartProductSAmount = ({condition}) => {
        fetch("http://localhost:3000/productAmount", { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.json())
            .then((data) => {
                console.log(condition)
                const currentAmount = data.amount;
                let updatedAmount;
                if(condition){
                    updatedAmount = currentAmount + 1;
                }else{
                    updatedAmount = currentAmount - 1;
                }
                
                return fetch(`http://localhost:3000/productAmount`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: updatedAmount }),
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update amount');
                }
            })
            .catch(error => {
                console.error('Error updating amount:', error);
            });
    }
    
    
    return {getCartData,setCartData, setCartProductAmount, setCartProductSAmount};
}