import Head from 'next/head'
import { getData } from '../lib/fetchData'
import TypeList from '../components/TypeList'
import ProductList from '../components/ProductList'
import { makeStyles } from '@material-ui/core/styles'
import ToolBar from '../components/ToolBar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2, 4)
  },
  grid: {
    margin: theme.spacing(2, 0),
  },
  cart: {
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0"
  },
}));

const Home = ({ types, products }) => {
  const classes = useStyles()

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <ToolBar />
      <TypeList types={types} />
      <Container maxWidth='md' className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.grid}
        >
          <Card className={classes.cart}>
            <Typography variant="h6">
              Sản phẩm mới nhất
            </Typography>
          </Card>
          <Link component="a" color="inherit" href="/products">
            <Typography variant="subtitle1">
              Tất cả sản phẩm
            </Typography>
          </Link>

        </Grid>
        <ProductList products={products} />
      </Container>
    </div>
  )
}

export async function getServerSideProps() {

  const resultType = await getData('types?limit=all&name=all')

  const resultProduct = await getData('products?limit=8&type=all&name=all')

  return {
    props: {
      types: resultType.types,
      products: resultProduct.products,
    }
  }
}

export default Home
