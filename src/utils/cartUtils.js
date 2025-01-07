

//funcion para calcular el total de los productos en el carrito, tiems es un objeto con los productos en el carrito
export const calculateTotal = (items) => {
    return Object.values(items).reduce(
        (acc, item) => ({
            total: acc.total + (item.precio * item.cantidad),
            cantidad: acc.cantidad + item.cantidad
        }),
        { total: 0, cantidad: 0 }
    )
}
