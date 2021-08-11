import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(() => ({
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
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Tên sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Số lượng</TableCell>
                        <TableCell className={classes.head} align="right">Giá sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Tổng giá</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                                <NumberFormat value={row.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </TableCell>
                            <TableCell align="right">
                                <NumberFormat value={ row.price*row.quantity } displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
