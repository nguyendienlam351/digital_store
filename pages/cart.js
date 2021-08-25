import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import { getData, postData } from '../lib/fetchData'
import { DataContext } from '../store/GlobalState'
import { increase, decrease, deleteToCart } from '../store/Actions'
import NumberFormat from 'react-number-format'
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
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
    },
    grid: {
        padding: theme.spacing(3, 0, 3, 0),
    },
    textField: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%',
    },
    item: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
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

const Cart = () => {
    const classes = useStyles()
    const contentType = 'application/json'
    const [totalPrice, setTotalPrice] = useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [notify, setNotify] = useState({})
    const [callback, setCallback] = useState(false)
    const [form, setForm] = useState(
        {
            name: '',
            address: '',
            phone: '',
        }
    )

    const { name, address, phone } = form

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
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocal) {
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

            updateCart()
        }
    }, [callback])

    const handlePayment = async () => {
        if (!name || !address || !phone)
            return setNotify({ type: "error", message: "Hãy điền đầy đủ thông tin" })

        console.log(phone)

        let newCart = [];
        for (const item of cart) {
            const res = await getData(`products/${item._id}`)
            if (res.data.quantity - item.cart_quantity >= 0) {
                newCart.push(item)
            }
        }

        if (newCart.length < cart.length) {
            setCallback(!callback)
            return setNotify({ type: "error", message: "Sản phẩm hết hàng hoặc số lượng không đủ" })
        }

        setNotify({ loading: true })

        const res = await postData('bills', { name, address, phone: phone.trim().replace('-', ''), product: cart })

        if (!res.success) return setNotify({ type: "error", message: "Lỗi đặt hàng" })

        dispatch({ type: 'ADD_CART', payload: [] })
        setForm({
            name: '',
            address: '',
            phone: '',
        })

        setNotify({ message: "Đặt hàng thành công" })
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

    const handleClose = () => {
        setNotify({})
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
                >{cart.length === 0 ?
                    <ShoppingCartIcon style={{ fontSize: 400 }} />
                    :
                    <>
                        <Grid item xs={7} >
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
                            xs={5} >
                            <TextField
                                className={classes.textField}
                                name="name"
                                value={name}
                                onChange={handleChange}
                                label="Họ tên"
                                variant="outlined"
                                placeholder="Nhập họ và tên..."
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
                                Tổng giá trị: <NumberFormat
                                    value={totalPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' đ'} />
                            </Typography>
                            <Button onClick={() => { handlePayment() }} variant="contained" color="primary">
                                Đặt hàng
                            </Button>
                        </Grid>
                    </>
                    }
                </Grid>

            </Container>
            <Backdrop className={classes.backdrop} open={notify.loading}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={notify.message}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert severity={notify.type}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Cart
