import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { DataContext } from '../store/GlobalState'
import { addToCart } from '../store/Actions'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3,2),
    },
    grid: {
        padding: theme.spacing(3, 0),
    },
    gridItem: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

export default function DetailProduct({ product }) {
    const classes = useStyles()
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [quant, setQuant] = useState(product.quantity !== 0 ? 1 : 0)

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

        if (newData.type) return dispatch({ type: 'NOTIFY', payload: newData })

        dispatch({ type: 'ADD_CART', payload: newData.data })
        dispatch({ type: 'NOTIFY', payload: { message: newData.message } })
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

    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="h5">
                {product.name}
            </Typography>
            <Grid
                className={classes.grid}
                container
                direction="row"
                alignItems="center"
                justifyContent= "center"
                 spacing={4}
            >
                <Grid item sm={5}>
                    <Image alt="product image" src={product.image} width={320} height={320} />
                </Grid>
                <Grid item sm={7}>
                    <Typography className={classes.gridItem} variant="h6">
                        {"Loại sản phẩm: "}
                        <Link component="a" color="inherit"
                            href={`/products?type=${product.type._id ? product.type._id : product.type}`} >
                            {product.type.name ? product.type.name : ''}
                        </Link>
                    </Typography>
                    <Typography className={classes.gridItem} variant="h6">
                        {`Giá: ${product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}`}
                    </Typography>
                    <Typography className={classes.gridItem} variant="h6">
                        {`Kho: ${product.quantity}`}
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
        </Container>
    )
}
