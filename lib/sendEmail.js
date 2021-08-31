import emailjs from 'emailjs-com'

const fomat = (number) => {
    return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
}

export const sendBillEmail = (data, dispatch) => {
    let product = ''
    let total = 0
    data.product.forEach(item => {
        const itemString =
            `${item.name}, số lượng: ${item.cart_quantity}, giá: ${fomat(item.price)}.\n`
        product = product + itemString
        total = total + (item.cart_quantity * item.price)
    });
    const message = {
        ...data,
        date: new Date(data.date).toLocaleString(),
        product: product,
        link: `${process.env.BASE_URL}/cart?id=${data._id}`,
        total: fomat(total)
    }

    emailjs.send(process.env.serviceID, process.env.templateID, message, process.env.userID)
        .then((result) => {
            dispatch({
                type: 'NOTIFY',
                payload: {
                    message: "Đặt hàng thành công\nThông tin đơn hàng đã được gửi đến email"
                }
            })
        }, (error) => {
            dispatch({
                type: 'NOTIFY',
                payload: {
                    type: "warning",
                    message: "Đặt hàng thành công\nThông tin đơn hàng không được gửi đến email"
                }
            });
        });
}