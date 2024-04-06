export default function PutCartProduct({ id, data }){
    fetch(`http://localhost:3000/cart/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return null
}