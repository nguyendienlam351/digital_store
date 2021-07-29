import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 230,
    },
    media: {
        height: 230,
        margin: theme.spacing(1),
    },
}));

export default function ProductList() {
    const classes = useStyles();

    return (
        <Card className={classes.root} alignItems="center">
            <a href="https://youtube.com">
                <CardMedia
                    className={classes.media}
                    image="https://cdn.tgdd.vn/Products/Images/42/237603/samsung-galaxy-a22-4g-black-600x600.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        Điện thoại Samsung Galaxy A22
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                </CardContent>
            </a>
        </Card>
    );
}
