import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 230,
    },
    media: {
        height: 230,
        margin: theme.spacing(1),
    },
}));

export default function ProductList({ product }) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Link component="a" color="inherit" href={`/products/${product._id}`}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
