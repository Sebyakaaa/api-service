import { useState } from "react";
import { getProduct, addProduct, getProductPromise, addProductPromise, deleteProductPromise, updateProductPromise } from "./api-service";


const ProductCard = () => {
    const [productId, setProductId] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleGetClick = async () => {
        try {
            const id = parseInt(productId);
            // const result = await getProduct(id);
            const result = await getProductPromise(id);

            console.log(result);
        } catch (error) {
            alert(`${error}`);
        } finally {
            setProductId('');
        }
    }

    const handleAddClick = async () => {
        const price = parseFloat(productPrice);
        // const result = await addProduct(productTitle, price);
        const result = await addProductPromise(productTitle, price);
        setProductTitle('');
        setProductPrice('');
        alert("Product added");
        console.log(result);
    }

    const handleUpdateClick = async () => {
        const id = parseInt(productId);
        const price = parseFloat(productPrice);
        const result = await updateProductPromise(id, productTitle, price);

        if (result.error) {
            alert(result.error);
        } else {
            alert(`Product ${id} updated`);
            console.log(result);
        }
        setProductId('')
        setProductTitle('');
        setProductPrice('');
    }

    const handleDeleteClick = async () => {
        const id = parseInt(productId);
        const result = await deleteProductPromise(id);

        if (result.error) {
            alert(result.error);
        } else {
            alert(`Product ${id} deleted`);
            console.log(result);
        }
        setProductId('');
    }

    const handleReset = () => {
        setProductId('');
        setProductTitle('');
        setProductPrice('');
    }

    return (<>
        <input value={productId} onChange={(e) => setProductId(e.target.value)} style={{ marginRight: '5px' }} type="number" min="1" step="1" placeholder='Enter product id' />
        <button style={{ marginTop: '20px', marginRight: '5px' }} onClick={handleGetClick}>Get Product</button>
        <button style={{ marginTop: '20px', marginRight: '40px' }} onClick={handleDeleteClick}>Delete Product</button>
        <input value={productTitle} onChange={(e) => setProductTitle(e.target.value)} style={{ marginRight: '5px' }} type="text" placeholder='Enter product title' />
        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ marginRight: '5px' }} type="number" placeholder='Enter product price' />
        <button style={{ marginTop: '20px', marginRight: '5px' }} onClick={handleAddClick}>Add Product</button>
        <button style={{ marginTop: '20px', marginRight: '40px' }} onClick={handleUpdateClick}>Update Product</button>
        <button onClick={handleReset}>Reset</button>
    </>
    );
};

export default ProductCard;