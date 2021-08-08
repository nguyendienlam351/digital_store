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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'next/image'

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: "#3f51b5",
        color: "white",
    },
}))

export default function ProductTable({ types, handleSelect, setErrors }) {
    const router = useRouter()
    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/types/${id}`, {
                method: 'Delete',
            })
            router.push('/admin/types/')
        } catch (error) {
            setErrors('Failed to delete the types.')
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Loại sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Ảnh</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {types.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <Image alt="type image" src={row.image} width={30} height={30} />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    onClick={() => { handleSelect(row) }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    onClick={() => { handleDelete(row._id) }}
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
