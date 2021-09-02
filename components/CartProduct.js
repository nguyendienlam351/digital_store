import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(1),
    },
    media: {
        width: 160,
        height: 160,
    },
}));

export default function CartProduct({ product, upQuant, downQuant, deleteCart }) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Grid
                container
                alignItems="center"
                item
                xs={4}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                />
            </Grid>
            <Grid item xs={7}>
                <CardContent >
                    <Link component="a" color="inherit" href={`/products/${product._id}`}>
                        <Typography variant="h6">
                            {product.name}
                        </Typography>
                    </Link>
                    <Typography variant="subtitle1">
                        {`Giá: ${product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}`}
                    </Typography>
                    <Typography variant="subtitle1">
                        {`Kho: ${product.quantity}`}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        alignItems="center">
                        <IconButton
                            onClick={() => downQuant(product._id)}
                            disabled={product.cart_quantity == 1}
                            color="inherit"
                        >
                            <ArrowLeftIcon color="primary" />
                        </IconButton>
                        <Typography variant="subtitle1">
                            {product.cart_quantity}
                        </Typography>
                        <IconButton
                            onClick={() => upQuant(product._id)}
                            disabled={product.cart_quantity == product.quantity}
                            color="inherit"
                        >
                            <ArrowRightIcon color="primary" />
                        </IconButton>
                    </Grid>
                </CardContent>
            </Grid>
            <Grid item xs={1}>
                <IconButton onClick={() => deleteCart(product._id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Card>
    )
}

