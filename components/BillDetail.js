import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';


export default function BillDetail({ bill }) {

    const totalPrice = bill.product.reduce((total, pro, index, product) => {
        return total += pro.price * pro.quantity
    }, 0)

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Mã đơn hàng: {bill._id}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Tên khách hàng: {bill.name}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={4}>
                    <Typography variant="subtitle1">Số điện thoại: {bill.phone}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">Ngày đặt hàng: {bill.date}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Tổng giá trị: <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="subtitle1">Địa chỉ: {bill.address}</Typography>
            </Grid>
        </Grid>
    )
}
