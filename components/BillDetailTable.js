import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(() => ({
    container: {
        maxHeight: 600,
    },
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: "#3f51b5",
        color: "white",
    },
}))

export default function BillDetailTable({ product }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Tên sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Số lượng</TableCell>
                        <TableCell className={classes.head} align="right">Giá sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Tổng giá</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cart_quantity}</TableCell>
                            <TableCell align="right">
                            {row.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                            </TableCell>
                            <TableCell align="right">
                            {(row.price * row.cart_quantity).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
