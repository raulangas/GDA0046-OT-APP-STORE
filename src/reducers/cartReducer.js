import { CART_ACTIONS } from "../constants/cartActions.js";
import { calculateTotal } from "../utils/cartUtils.js";


//estado inicial del carrito
export const initialState = {
    items: {},
    total: 0,
    cantidad: 0
}

//reducer para el carrito
export const cartReducer = (state, action) => {
    switch (action.type) {

        case CART_ACTIONS.ADD_ITEM:

            {
                const product = action.payload;

                const foundCartItem = state.items[product.id];

                if (foundCartItem) {

                    if (foundCartItem.cantidad + 1 > product.stock) {
                        console.warn('Stock insuficiente');
                        return state;
                    }

                    const updatedItems = {
                        ...state.items,
                        [product.id]: {
                            ...foundCartItem,
                            precio: product.precio,
                            cantidad: foundCartItem.cantidad + 1,
                        }
                    };

                    const { total, cantidad } = calculateTotal(updatedItems);

                    return {
                        ...state,
                        items: updatedItems,
                        total,
                        cantidad,
                    };
                }

                // Agregar nuevo item
                const updatedItems = {
                    ...state.items,
                    [product.id]: {
                        id: product.id,
                        categoria: product.categoria,
                        nombre: product.nombre,
                        marca: product.marca,
                        codigo: product.codigo,
                        precio: product.precio,
                        imagen: product.imagen,
                        stock: product.stock,
                        cantidad: 1
                    }
                };

                const { total, cantidad } = calculateTotal(updatedItems);

                return {
                    ...state,
                    items: updatedItems,
                    total,
                    cantidad,
                };
            }

        case CART_ACTIONS.REMOVE_ITEM:

            {
                const product = action.payload;
                const foundCartItem = state.items[product.id];

                // Si no se encuentra el item, no hacer nada
                if (!foundCartItem) return state;

                let updatedItems;

                if (foundCartItem.quantity === 1) {
                    // Eliminar el item completamente
                    updatedItems = { ...state.items };
                    delete updatedItems[product.id];
                } else {
                    // Decrementar la cantidad
                    updatedItems = {
                        ...state.items,
                        [product.id]: {
                            ...foundCartItem,
                            cantidad: foundCartItem.cantidad - 1
                        }
                    };
                }

                const { total, cantidad } = calculateTotal(updatedItems);

                return {
                    ...state,
                    items: updatedItems,
                    total,
                    cantidad,
                };
            }

        case CART_ACTIONS.UPDATE_ITEM_QUANTITY:

            {
                const { id, cantidad } = action.payload;

                // Validar que la cantidad sea mayor a 0 y que el item exista
                if (cantidad < 1 || !state.items[id]) return state;

                const item = state.items[id];
                // Validar que la cantidad no sea mayor al stock
                if (cantidad > item.stock) return state;

                const updatedItems = {
                    ...state.items,
                    [id]: {
                        ...item,
                        cantidad
                    }
                };

                const totals = calculateTotal(updatedItems);

                return {
                    ...state,
                    items: updatedItems,
                    total: totals.total,
                    cantidad: totals.cantidad,
                };
            }

        case CART_ACTIONS.CLEAR_CART:

            // Limpiar el carrito
            return {
                ...initialState,
            };

        case CART_ACTIONS.RESTORE_CART:

            // Restaurar el carrito desde un objeto
            return {
                ...action.payload,
            };

        default:
            // Si la acción no existe, retornar el estado actual
            return state;
    }
};
