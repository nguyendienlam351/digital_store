import Head from 'next/head'
import ToolBar from '../../components/ToolBar'
import { makeStyles } from '@material-ui/core/styles'
import TypeList from '../../components/TypeList'
import Type from '../../models/Type'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
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

const TypeProducts = ({ types, products, params }) => {
  const classes = useStyles();
  let type = types.find(item => item._id === params);

  return (
    <div>
      <Head>
        <title>Product Type</title>
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
            Sản Phẩm {type.name}
            </Typography>
          </Card>

        </Grid>
        <ProductList products={products} />
      </Container>
    </div>
  )
}

export async function getServerSideProps({ params }) {

  await dbConnect()

  /* find all the data in our database */
  const resultType = await Type.find({})
  const types = resultType.map((doc) => {
    const type = doc.toObject()
    type._id = type._id.toString()
    return type
  })

  const resultProduct = await Product.find({ type: params.id }).limit(8)
  const products = resultProduct.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })

  return { props: { types: types, products: products, params: params.id } }
}

export default TypeProducts
