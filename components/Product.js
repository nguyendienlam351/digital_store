import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router'

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
    const router = useRouter()

    return (
        <Card className={classes.root}>
            <CardActionArea 
              onClick={()=>router.push(`/products/${product._id}`)}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
