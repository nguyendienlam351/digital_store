import Head from 'next/head'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToolBar from '../../components/ToolBar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TypeList from '../../components/TypeList'
import ProductList from '../../components/ProductList'
import { getData } from '../../lib/fetchData'
import filterSearch from '../../lib/filterSearch'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

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

const Products = (props) => {
  const classes = useStyles();
  const router = useRouter()
  const [products, setProducts] = useState(props.products)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  return (
    <div>
      <Head>
        <title>All Product</title>
      </Head>
      <ToolBar />
      <TypeList types={props.types} />
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
        { props.length < page*8 ? "" :
          <Grid
            container
            direction="row"
            justifyContent="center"
            className={classes.grid}
          >
            <Button onClick={() => handleLoadmore()} variant="outlined" color="primary">
              Xem thêm
            </Button>
          </Grid>
        }
      </Container>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1

  const resultType = await getData('types')

  const resultProduct = await getData(
    `products?limit=${page * 8}`
  )

  return {
    props: {
      types: resultType.types,
      products: resultProduct.products,
      length: resultProduct.length
    }
  }
}

export default Products
