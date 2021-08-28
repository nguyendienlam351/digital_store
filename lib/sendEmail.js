import emailjs from 'emailjs-com'

const fomat = (number) => {
    return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
}

export const sendBillEmail = (data) => {
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
        total: fomat(total)
    }

    emailjs.send(process.env.serviceID, process.env.templateID, message, process.env.userID)
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}