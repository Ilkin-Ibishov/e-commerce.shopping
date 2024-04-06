export function fetchAllProducts() {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => console.error("Error fetching product data:", error));
    return data;
    }