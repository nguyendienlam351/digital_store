import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import ToolBar from '../../components/ToolBar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TypeList from '../../components/TypeList'
import Type from '../../models/Type'
import Product from '../../models/Product'
import dbConnect from '../../lib/dbConnect'
import ProductList from '../../components/ProductList'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0, 3, 0),
  },
  grid: {
    margin: theme.spacing(3, 0, 3, 0),
  },
  cart: {
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0"
  },
}));

const Home = ({ types, products }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>All Product</title>
      </Head>
      <ToolBar />
      <TypeList types={types} />
      <Container maxWidth='md' className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          className={classes.grid}
        >
          <Card className={classes.cart}>
            <Typography variant="h6">
              Tất cả sản phẩm
            </Typography>
          </Card>

        </Grid>
        <ProductList products={products} />
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

  const resultProduct = await Product.find({}).sort({ _id: -1 }).limit(8)
  const products = resultProduct.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })


  return { props: { types: types, products: products } }
}

export default Home
