import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


export default function BillDetail({ bill }) {

    const totalPrice = bill.product.reduce((total, item) => {
        return total += item.price * item.cart_quantity
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
                <Grid item md={4}>
                    <Typography variant="subtitle1"><b>Mã đơn hàng: </b>{bill._id}</Typography>
                </Grid>
                <Grid item md={8}>
                    <Typography variant="subtitle1"><b>Tên khách hàng: </b>{bill.name}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item md={4}>
                    <Typography variant="subtitle1"><b>Số điện thoại: </b>{bill.phone}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant="subtitle1"><b>Ngày đặt hàng: </b>{new Date(bill.date).toLocaleString()}</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant="subtitle1">
                        <b>Tổng giá trị: </b> {totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            > <Grid item md={4}>
                    <Typography variant="subtitle1"><b>Email: </b>{bill.email}</Typography>
                </Grid>
                <Grid item md={8}>
                    <Typography variant="subtitle1"><b>Địa chỉ: </b>{bill.address}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
