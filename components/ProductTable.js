import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

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

export default function ProductTable({ products, handleLoadmore, length, page }) {
    const router = useRouter()
    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/products/${id}`, {
                method: 'Delete',
            })
            router.push('/admin/products/')
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: 'Failed to delete the product.' } })
        }
    }

    return (
        <TableContainer component={Paper} className={classes.container} >
            <Table stickyHeader className={classes.table} aria-label="sticky table">
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
                        <TableRow hover key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                            {row.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="center">
                                <Link component="a" color="inherit" href={`/admin/products/${row._id}`}>
                                    <IconButton
                                        color="inherit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </TableCell>
                            <TableCell align="center">
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
                {length < page * 8 ? null :
                    <caption >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                        >
                            <Button
                                onClick={() => handleLoadmore()}
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
