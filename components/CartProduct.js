import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NumberFormat from 'react-number-format';

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
export default function CartProduct() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Grid 
            container 
            alignItems="center" 
            xs={3}>
                <CardMedia
                    className={classes.media}
                    image="https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
                />
            </Grid>
            <Grid xs={12}>
                <CardContent >
                    <Typography variant="h6">
                        Laptop Lenovo Legion 5 Gaming 15IMH05
                    </Typography>
                    <Typography variant="subtitle1">
                        Giá: <NumberFormat value={1000000} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                    <Grid
                        className={classes.gridItem}
                        container
                        direction="row"
                        alignItems="center">
                        <IconButton
                            color="inherit"
                        >
                            <ArrowLeftIcon color="primary" />
                        </IconButton>
                        <Typography variant="subtitle1">
                            1
                        </Typography>
                        <IconButton
                            color="inherit"
                        >
                            <ArrowRightIcon color="primary" />
                        </IconButton>
                    </Grid>
                </CardContent>
            </Grid>
            <Grid xs={2}>
                <CardContent >
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardContent >
            </Grid>
        </Card>
    )
}
