import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import Link from 'next/Link';

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
    const classes = useStyles();
    const [quant, setQuant] = useState(1)

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
            >
                <Grid item xs={5} >
                    <Image alt="product image" src={'data:image/png;base64,' + product.image} width={320} height={320} />
                </Grid>
                <Grid item xs={7} >
                    <Typography className={classes.gridItem} variant="h6">
                        {"Loại sản phẩm: "}
                        <Link href="/type/[id]" as={`/type/${type._id}`}>
                            <a>
                            {type.name}
                            </a>
                        </Link>
                    </Typography>
                    <Typography className={classes.gridItem} variant="h6">
                        Giá: 
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
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
                            color="inherit"
                        >
                            <ArrowLeftIcon color="primary" />
                        </IconButton>
                        <Typography variant="h6">
                            {quant}
                        </Typography>
                        <IconButton
                            onClick={() => { upQuant() }}
                            color="inherit"
                        >
                            <ArrowRightIcon color="primary" />
                        </IconButton>
                    </Grid>
                    <Button onClick={() => { }} variant="contained" color="primary">
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
