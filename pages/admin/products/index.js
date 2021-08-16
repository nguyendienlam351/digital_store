import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getData } from '../../../lib/fetchData'
import filterSearch from '../../../lib/filterSearch'
import ProductTable from '../../../components/ProductTable'
import { makeStyles } from '@material-ui/core/styles'
import AdToolBar from '../../../components/AdToolBar'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    grid: {
        marginBottom: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#ffffff',
        border: "1px solid #3f51b5",
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '60ch',
        },
    },
}));

const Index = (props) => {
    const router = useRouter()
    const classes = useStyles();
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState(props.products)
    const [search, setSearch] = useState('')

    useEffect(() => {
        setProducts(props.products)

        if (Object.keys(router.query).length === 0) setPage(1)

    }, [router.query, props.products])

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    const handleAdd = () => {
        router.push('/admin/products/new')
    }

    const handleLoadmore = () => {
        setPage(page + 1)
        filterSearch({ router, page: page + 1 })
    }

    return (
        <div>
            <Head>
                <title>Product Manager</title>
            </Head>
            <AdToolBar select="Quản lý sản phẩm" />
            <Container className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Typography variant="h6">
                        Quản lý sản phẩm:
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={search.toLowerCase()} 
                            onChange={e => setSearch(e.target.value)}
                            endAdornment={
                                !search ? null :
                                    <InputAdornment position="end">
                                        <IconButton
                                            className={classes.menuButton}
                                            edge="end"
                                            onClick={() => setSearch('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                            }
                        />
                    </div>
                    <Button onClick={() => { handleAdd() }} variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </Grid>
                <ProductTable
                    products={products}
                    handleLoadmore={handleLoadmore}
                    page={page}
                    length={props.length} />
            </Container>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const page = query.page || 1
    const search = query.search || 'all'

    const resultType = await getData('types?limit=all&name=all')

    const resultProduct = await getData(
        `products?type=all&limit=${page * 8}&name=${search}`
    )

    const products = resultProduct.products.map((product) => {
        product.type = resultType.types.find(item => item._id === product.type).name;
        return product
    })

    return {
        props: {
            types: resultType.types,
            products: products,
            length: resultProduct.length,
        }
    }
}

export default Index