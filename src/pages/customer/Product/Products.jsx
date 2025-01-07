import ProductList from './ProductList';
import { useNotification } from '../../../hooks/useNotification';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProducts } from '../../../api/apiService';


export const Products = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { showNotification } = useNotification();

    const loadProducts = async () => {
        try {
            const response = await fetchProducts();
            const { data, success, message } = response.data;

            if (!success) {
                throw new Error(message);
            }

            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log('Error cargando productos:', error);
            showNotification('Error al cargar los productos', 'error');
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <ProductList products={products} loading={loading} />

    )
}