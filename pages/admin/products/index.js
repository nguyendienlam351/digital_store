import Head from 'next/head'
import { useRouter } from 'next/router'
import Type from '../../../models/Type'
import Product from '../../../models/Product'
import dbConnect from '../../../lib/dbConnect'
import ProductTable from '../../../components/ProductTable'
import { makeStyles } from '@material-ui/core/styles'
import AdToolBar from '../../../components/AdToolBar'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

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

const Index = ({ products }) => {
    const router = useRouter()
    const classes = useStyles();

    const handleAdd = () => {
        router.push('/admin/products/new')
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
                        />
                    </div>
                    <Button onClick={()=>{handleAdd()}} variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </Grid>
                <ProductTable products={products} />
            </Container>
        </div>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const resultType = await Type.find({})
    const types = resultType.map((doc) => {
        const type = doc.toObject()
        type._id = type._id.toString()
        return type
    })

    const resultProduct = await Product.find({}).sort({ _id: -1 })
    const products = resultProduct.map((doc) => {
        const product = doc.toObject()
        product._id = product._id.toString()
        product.type = types.find(item => item._id === product.type).name;
        return product
    })


    return { props: { products: products } }
}

export default Index