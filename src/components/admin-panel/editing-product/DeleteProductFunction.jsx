import React from 'react';
import DeleteIcon from '../../../assets/DeleteIcon.svg'
function ProductDeleter({ direct, productId }) {
  let output = <div></div>
  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${direct}/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`Product with id ${productId} deleted successfully.`);
      } else {
        console.log(`Error deleting product with id ${productId}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  if(direct==='products'){
    output = <button onClick={deleteProduct}>Delete Product</button>
  }if(direct==='cart'){
    output = <span onClick={deleteProduct} ><img src={DeleteIcon} alt="Delete Icon" /></span>
  }if(direct==='discounts'){
    output = <span onClick={deleteProduct}>Delete</span>
  }
  return (<>
  {output}
  </>
    
  );
}

export default ProductDeleter;
