import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: "#3f51b5",
        color: "white",
    },
}))

export default function BillTable({ bills }) {
    const router = useRouter()
    const classes = useStyles();

      const handleView = (id) => {
          router.push(`/admin/bills/${id}`)
      }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Mã đơn hàng</TableCell>
                        <TableCell className={classes.head}align="right">Tên khách hàng</TableCell>
                        <TableCell className={classes.head} align="right">Ngày đặt hàng</TableCell>
                        <TableCell className={classes.head} align="right">Số điện thoại</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bills.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    onClick={()=>{handleView(row._id)}}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
