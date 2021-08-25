import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import { addToCart } from '../store/Actions'
import NumberFormat from 'react-number-format'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
    },
    grid: {
        padding: theme.spacing(3, 0, 3, 0),
    },
    gridItem: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

export default function DetailProduct({ type, product }) {
    const classes = useStyles()
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [quant, setQuant] = useState(product.quantity !== 0 ? 1 : 0)
    const [notify, setNotify] = useState({})

    const handleAddCart = () => {
        const cartProduct = {
            _id: product._id,
            name: product.name,
            quantity: product.quantity,
            image: product.image,
            price: product.price,
            cart_quantity: quant
        }
        const newData = addToCart(cartProduct, cart)

        if (newData.type) return setNotify(newData)

        dispatch({ type: 'ADD_CART', payload: newData.data })
        setNotify({ message: newData.message })
    }

    const downQuant = () => {
        if (quant > 1) {
            setQuant(quant - 1)
        }
    }

    const upQuant = () => {
        if (quant < product.quantity) {
            setQuant(quant + 1)
        }
    }

    const handleClose = () => {
        setNotify({})
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="h5">
                {product.name}
            </Typography>
            <Grid
                className={classes.grid}
                container
                direction="row"
            >
                <Grid item xs={5} >
                    <Image alt="product image" src={product.image} width={320} height={320} />
                </Grid>
                <Grid item xs={7} >
                    <Typography className={classes.gridItem} variant="h6">
                        {"Loại sản phẩm: "}
                        <Link component="a" color="inherit"
                            onClick={() => router.push(`/products?type=${type._id}`)} >
                            {type.name}
                        </Link>
                    </Typography>
                    <Typography className={classes.gridItem} variant="h6">
                        Giá:
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                    <Typography className={classes.gridItem} variant="h6">
                        Kho: {product.quantity}
                    </Typography>
                    <Grid
                        className={classes.gridItem}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Typography className={classes.gridItem} variant="h6">
                            Số lượng:
                        </Typography>
                        <IconButton
                            onClick={() => { downQuant() }}
                            disabled={quant == 1}
                            color="inherit"
                        >
                            <ArrowLeftIcon color="primary" />
                        </IconButton>
                        <Typography variant="h6">
                            {quant}
                        </Typography>
                        <IconButton
                            onClick={() => { upQuant() }}
                            disabled={quant == product.quantity}
                            color="inherit"
                        >
                            <ArrowRightIcon color="primary" />
                        </IconButton>
                    </Grid>
                    <Button
                        disabled={product.quantity == 0}
                        onClick={() => { handleAddCart() }}
                        variant="contained" color="primary">
                        Thêm vào giỏ hàng
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="h6">
                Chi tiết sản phẩm
            </Typography>
            <Typography variant="subtitle1">
                {product.description}
            </Typography>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={notify.message}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert severity={notify.type}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}
