export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    ADD_CART: 'ADD_CART',
}

export const addToCart = (product, cart) => {
    let newData = [...cart]
    if (product.quantity < 1 )
        return ({ type: "error", message: 'Thêm sản phẩm không thành công' })

    const pos = newData.findIndex(item => item._id == product._id)

    if (pos !== -1) {
        const newQuant = parseInt(newData[pos].cart_quantity) + parseInt(product.cart_quantity)

        if(newQuant > newData[pos].quantity) return ({ type: "error", message: 'Vượt quá số lượng sản phẩm' })

        newData.fill({
            ...newData[pos],
            cart_quantity: newQuant
        }, pos, pos + 1)
    }
    else {
        newData = [...cart, product]
    }

    return ({ data: newData, message: 'Thêm sản phẩm thành công' })
}

export const increase = (data, id) => {
    const newData = [...data]
    newData.forEach(item => {
        if(item._id === id && item.cart_quantity < item.quantity) item.cart_quantity += 1
    })

    return ( newData )
}

export const decrease = (data, id) => {
    const newData = [...data]
    newData.forEach(item => {
        if(item._id === id && item.quantity > 1) item.cart_quantity -= 1
    })

    return ( newData )
}


export const deleteToCart = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return (newData)
}

