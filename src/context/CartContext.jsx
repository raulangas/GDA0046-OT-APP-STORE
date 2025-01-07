import { createContext } from "react";
import { CART_ACTIONS } from "../constants/cartActions.js";
import { useReducer } from "react";
import { useEffect } from "react";
import { initialState, cartReducer } from "../reducers/cartReducer.js";

//creando el contexto para el carrito
export const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);


    const itemsArray = Object.values(state.items);

    // Cargar carrito desde localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Validar estructura del carrito guardado
                console.log(parsedCart);

                if (parsedCart && typeof parsedCart.items === 'object') {
                    dispatch({ type: CART_ACTIONS.RESTORE_CART, payload: parsedCart });
                }
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Guardar carrito en localStorage al cambiar
    useEffect(() => {

        // Guardar el carrito en localStorage
        Object.keys(state.items).length > 0 ? localStorage.setItem('cart', JSON.stringify(state)) : localStorage.removeItem('cart');

    }, [state]);



    const addItem = (product) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
    };

    const removeItem = (product) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: product });
    };

    const updateItemQuantity = (id, cantidad) => {
        dispatch({ type: CART_ACTIONS.UPDATE_ITEM_QUANTITY, payload: { id, cantidad } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    // Método para obtener el resumen del carrito
    const getCartSummary = () => {
        return {
            totalItems: state.cantidad,
            totalAmount: state.total,
            uniqueItems: state.items.length,
        };
    };


    return (
        <CartContext.Provider value={{
            items: itemsArray,
            total: state.total,
            cantidad: state.cantidad,
            addItem,
            removeItem,
            updateItemQuantity,
            clearCart,
            getCartSummary
        }}>
            {children}
        </CartContext.Provider>
    );
}