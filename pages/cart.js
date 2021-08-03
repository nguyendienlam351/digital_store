import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import ToolBar from '../components/ToolBar'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CartProduct from '../components/CartProduct';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
    },
    grid: {
        padding: theme.spacing(3, 0, 3, 0),
    },
    textField: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%',
    },
    item: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

const Cart = () => {
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>Cart Page</title>
            </Head>
            <ToolBar />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    direction="row"
                >
                    <Grid item xs={7} >
                        {
                            [1, 2, 3, 4, 5].map((item) => (
                                <CartProduct key={item} />
                            ))
                        }
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        item
                        xs={5} >
                        <TextField
                            className={classes.textField}
                            label="Họ tên"
                            variant="outlined"
                            placeholder="Nhập họ và tên..."
                        />
                        <TextField
                            className={classes.textField}
                            label="Số điện thoại"
                            variant="outlined"
                            placeholder="Nhập số điện thoại..."
                        />
                        <TextField
                            className={classes.textField}
                            label="Địa chỉ"
                            variant="outlined"
                            placeholder="Nhập địa chỉ..."
                            multiline
                            rows={3}
                        />
                        <Typography className={classes.item} variant="h6">
                            Tổng giá trị: <NumberFormat
                                value={1000000}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'} />
                        </Typography>
                        <Button onClick={() => { }} variant="contained" color="primary">
                            Thêm vào giỏ hàng
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Cart
