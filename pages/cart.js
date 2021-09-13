import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import { sendBillEmail } from '../lib/sendEmail'
import { getData, postData } from '../lib/fetchData'
import { DataContext } from '../store/GlobalState'
import { increase, decrease, deleteToCart } from '../store/Actions'
import { makeStyles } from '@material-ui/core/styles'
import ToolBar from '../components/ToolBar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CartProduct from '../components/CartProduct'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        padding: theme.spacing(3, 0),
    },
    textField: {
        paddingBottom: theme.spacing(2),
        width: '100%',
    },
    item: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const Cart = ({ products }) => {
    const classes = useStyles()
    const [totalPrice, setTotalPrice] = useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [open, setOpen] = useState(false)
    const [callback, setCallback] = useState(false)
    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            address: '',
            phone: '',
        }
    )

    const { name, email, address, phone } = form

    useEffect(() => {
        if (products) {
            updateCart(products)
        }

    }, [])

    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.cart_quantity)
            }, 0)

            setTotalPrice(res)
        }

        getTotal()
    }, [cart])

    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('local_cart'))
        if (cartLocal && cartLocal.length > 0) {
            updateCart(cartLocal)
        }
    }, [callback])

    const handlePayment = async () => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        if (!valid())
            return dispatch({ type: 'NOTIFY', payload: { type: "error", message: "Hãy điền đầy đủ thông tin" } })

        let newCart = [];
        for (const item of cart) {
            const res = await getData(`products/${item._id}`)
            if (res.data.quantity - item.cart_quantity >= 0) {
                newCart.push(item)
            }
        }

        if (newCart.length < cart.length) {
            setCallback(!callback)
            return dispatch({ type: 'NOTIFY', payload: { type: "error", message: "Sản phẩm hết hàng hoặc số lượng không đủ" } })
        }

        const res = await postData('bills', { name, email: email.toLowerCase(), address, phone: phone.replace(/[- ]/g, ''), product: cart })

        if (!res.success) return dispatch({ type: 'NOTIFY', payload: { type: "error", message: "Lỗi đặt hàng" } })

        dispatch({ type: 'ADD_CART', payload: [] })
        setForm({
            name: '',
            address: '',
            phone: '',
        })

        sendBillEmail(res.data, dispatch)
    }

    const deleteCart = (id) => {
        dispatch({ type: 'ADD_CART', payload: deleteToCart(cart, id) })
    }

    const downQuant = (id) => {
        dispatch({ type: 'ADD_CART', payload: decrease(cart, id) })
    }

    const upQuant = (id) => {
        dispatch({ type: 'ADD_CART', payload: increase(cart, id) })
    }

    const valid = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(name.trim())
            || !(address.trim())
            || !(phone.replace(/[-\s]/g, ''))
            || !(re.test(String(email).toLowerCase()))
        )
            return false
        return true
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value,
        })
    }


    const updateCart = async (products) => {
        let newArr = []
        for (const item of products) {
            const res = await getData(`products/${item._id}`)
            const { _id, name, image, price, quantity } = res.data
            if (quantity > 0) {
                newArr.push({
                    _id, name, image, price, quantity,
                    cart_quantity: item.cart_quantity > quantity ? quantity : item.cart_quantity
                })
            }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
    }
    return (
        <div>
            <Head>
                <title>Cart Page</title>
            </Head>
            <ToolBar />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    justifyContent="center"
                    direction="row"
                    spacing={2}>
                    {cart.length === 0 ?
                        <ShoppingCartIcon style={{ fontSize: 400 }} />
                        :
                        <>
                            <Grid item sm={12} md={7}>
                                {
                                    cart.map((product) => (
                                        <CartProduct
                                            key={product._id}
                                            product={product}
                                            upQuant={upQuant}
                                            downQuant={downQuant}
                                            deleteCart={deleteCart} />
                                    ))
                                }
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                item
                                sm={12} md={5} >
                                <TextField
                                    className={classes.textField}
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    label="Họ tên"
                                    variant="outlined"
                                    placeholder="Nhập họ và tên..."
                                />
                                <TextField
                                    className={classes.textField}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    label="Email"
                                    variant="outlined"
                                    placeholder="Nhập email"
                                />
                                <FormControl
                                    className={classes.textField}
                                    variant="outlined">
                                    <InputLabel>Số điện thoại</InputLabel>
                                    <OutlinedInput
                                        labelWidth={110}
                                        name="phone"
                                        value={phone}
                                        onChange={handleChange}
                                        inputComponent={TextMaskCustom}
                                    />
                                </FormControl>
                                <TextField
                                    className={classes.textField}
                                    name="address"
                                    value={address}
                                    onChange={handleChange}
                                    label="Địa chỉ"
                                    variant="outlined"
                                    placeholder="Nhập địa chỉ..."
                                    multiline
                                    rows={3}
                                />
                                <Typography className={classes.item} variant="h6">
                                    {`Tổng giá trị: ${totalPrice.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}`}
                                </Typography>
                                <Button disabled={!valid()} onClick={() => { setOpen(true) }} variant="contained" color="primary">
                                    Đặt hàng
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bạn có chắc muốn đặt hàng?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thông tin đơn hàng của bạn sẽ được gửi đến email: <Typography color='textPrimary'>{email}</Typography>.<br />
                        Nhập chấp nhận để đặt hàng.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Từ chối
                    </Button>
                    <Button onClick={() => {
                        setOpen(false)
                        handlePayment()
                    }}
                        color="primary" autoFocus>
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    if (!query.id) return { props: { products: null } }

    const bill = await getData(`bills/${query.id}`)

    return {
        props: {
            products:
                bill.data ? bill.data.product : null
        }
    }
}

export default Cart
