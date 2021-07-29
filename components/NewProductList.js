import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Product from './Product'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3, 0, 3, 0),
    },
    cart: {
        margin: theme.spacing(3, 0, 3, 0),
        padding: theme.spacing(1),
        backgroundColor: "#f0f0f0"
    },
}));

export default function NewProductList() {
    const classes = useStyles();
    return (
        <Container maxWidth='md' className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Card className={classes.cart}>
                    <Typography variant="h6">
                        Sản phẩm nổi bật
                    </Typography>
                </Card>
                <a href="https://youtube.com">
                    <Typography variant="subtitle1">
                        Tất cả sản phẩm
                    </Typography>
                </a>

            </Grid>
            <Grid
                container
                spacing={1}
            >
                {[1, 2, 3, 4, 5, 6,7,8].map((item) => (
                    <Grid key={item} item xs={3}>
                        <Product />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
