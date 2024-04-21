import ProductDataFetcher from "../ProductDataFetcher.jsx";
import React, { useState } from "react";
export default function DeleteProductPanel(){
  const [productData, setProductData] = useState([]);

  return (
      <>
          <ProductDataFetcher setData={setProductData} />
          {productData.map((product, idx) => (
              <div key={idx}>
                  {product.productName}
              </div>
          ))}
      </>
  );
}