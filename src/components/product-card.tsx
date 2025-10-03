import { useState } from "react";
import { createProduct, deleteProductById, getProductAll, getProductById, updateProduct } from '../services/product-service';

const ProductCard = () => {
    const [productId, setProductId] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleGetAllClick = async () => {
        try {
            const products = await getProductAll();
            console.log(products);
        } catch (error) {
            alert(`${error}`);
        }
    }

    const handleGetClick = async () => {
        try {
            const id = parseInt(productId);
            const product = await getProductById(id);
            console.log(product);
        } catch (error) {
            alert(`${error}`);
        } finally {
            setProductId('');
        }
    }

    const handleAddClick = async () => {
        try {
            const price = parseFloat(productPrice);
            const result = await createProduct(productTitle, price);
            alert("Product added");
            console.log(result);
        } catch (error) {
            alert(`${error}`);
        } finally {
            setProductTitle('');
            setProductPrice('');
        }
    }

    const handleUpdateClick = async () => {
        try {
            const id = parseInt(productId);
            const price = parseFloat(productPrice);
            const result = await updateProduct(id, productTitle, price);
            alert(`Product ${id} updated`);
            console.log(result);
        } catch (error) {
            alert(error instanceof Error ? error.message : String(error));
            // alert(`${error}`);
        } finally {
            setProductId('')
            setProductTitle('');
            setProductPrice('');
        }
    }

    const handleDeleteClick = async () => {
        try {
            const id = parseInt(productId);
            const result = await deleteProductById(id);
            alert(`Product ${id} deleted`);
            console.log(result);
        } catch (error) {
            alert(error instanceof Error ? error.message : String(error));
            // alert(`${error}`);
        } finally { setProductId(''); }
    }

    const handleReset = () => {
        setProductId('');
        setProductTitle('');
        setProductPrice('');
    }

    return (<>
        <button style={{ marginTop: '20px', marginRight: '5px' }} onClick={handleGetAllClick}>Get All Products</button>
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