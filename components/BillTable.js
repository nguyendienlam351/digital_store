import React from 'react'
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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

export default function BillTable(props) {
    const router = useRouter()
    const classes = useStyles();

    const handleView = (id) => {
        router.push(`/admin/bills/${id}`)
    }

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Mã đơn hàng</TableCell>
                        <TableCell className={classes.head} align="right">Tên khách hàng</TableCell>
                        <TableCell className={classes.head} align="right">Ngày đặt hàng</TableCell>
                        <TableCell className={classes.head} align="right">Số điện thoại</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.bills.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{new Date(row.date).toLocaleString()}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    onClick={() => { handleView(row._id) }}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {props.length < props.page * 8 ? null :
                    <caption >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                        >
                            <Button
                                onClick={() => props.handleLoadmore()}
                                variant="outlined"
                                color="primary">
                                Xem thêm
                            </Button>
                        </Grid>
                    </caption>
                }
            </Table>
        </TableContainer>
    )
}
