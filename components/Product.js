import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format';
import Link from 'next/Link';

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
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link href="/products/[id]" as={`/products/${product._id}`}>
                <a>
                <CardMedia
                    className={classes.media}
                    image={'data:image/png;base64,' + product.image}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                </CardContent>
                </a>
            </Link>
        </Card>
    );
}
