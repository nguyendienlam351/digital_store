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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: "#3f51b5",
        color: "white",
    },
}))

export default function ProductTable({ products }) {
    const router = useRouter()
    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
          await fetch(`/api/products/${id}`, {
            method: 'Delete',
          })
          router.push('/admin/products/')
        } catch (error) {
          console.log('Failed to delete the pet.')
        }
      }
    
      const handleEdit = (id) => {
          router.push(`/admin/products/${id}`)
      }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Tên sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Giá sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Số lượng</TableCell>
                        <TableCell className={classes.head} align="right">Loại sản phẩm</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <NumberFormat value={row.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="inherit"
                                    onClick={()=>{handleEdit(row._id)}}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="inherit"
                                    onClick={()=>{handleDelete(row._id)}}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
