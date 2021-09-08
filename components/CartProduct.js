import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(1),
    },
    cart: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        margin: 'auto',
        display: 'block',
        width: 160,
        height: 160,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function CartProduct({ product, upQuant, downQuant, deleteCart }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Card className={classes.cart}>
                <Grid container spacing={2}>
                    <Grid item>
                        <CardMedia
                            className={classes.image}
                            image={product.image}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column">
                                <Link
                                    component="a"
                                    color="inherit"
                                    href={`/products/${product._id}`}>
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
                            
                                <div className={classes.controls}>
                                    <IconButton
                                        onClick={() => downQuant(product._id)}
                                        disabled={product.cart_quantity == 1}
                                        color="inherit"
                                        size="small"
                                    >
                                        <ArrowLeftIcon fontSize="large" color="primary" />
                                    </IconButton>
                                    <Typography variant="subtitle1">
                                        {product.cart_quantity}
                                    </Typography>
                                    <IconButton
                                        onClick={() => upQuant(product._id)}
                                        disabled={product.cart_quantity == product.quantity}
                                        color="inherit"
                                        size="small"
                                    >
                                        <ArrowRightIcon fontSize="large" color="primary" />
                                    </IconButton>
                                </div>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => deleteCart(product._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

