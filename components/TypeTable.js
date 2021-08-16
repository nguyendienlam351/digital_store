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

export default function ProductTable(props) {
    const router = useRouter()
    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/types/${id}`, {
                method: 'Delete',
            })
            router.push('/admin/types/')
        } catch (error) {
            props.setErrors('Failed to delete the types.')
        }
    }

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>Loại sản phẩm</TableCell>
                        <TableCell className={classes.head} align="right">Ảnh</TableCell>
                        <TableCell className={classes.head} ></TableCell>
                        <TableCell className={classes.head} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.types.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <Image alt="type image" src={row.image} width={30} height={30} />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    onClick={() => { props.handleSelect(row) }}
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
