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
    padding: theme.spacing(1, 2)
  },
  grid: {
    margin: theme.spacing(2, 0)
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
  const [title, setTitle] = useState('')

  useEffect(() => {
    setProducts(props.products)
    if (Object.keys(router.query).length === 0) setPage(1)

    if(props.search !=='all') {
      setTitle(`Từ khóa tìm kiếm: ${props.search}`)
    }
    else if(props.type !=='all') {
      const nameType = props.types.find(item => item._id === props.type);
      setTitle(nameType ? `Sản phẩm ${nameType.name}` : '')
    }
    else {
      setTitle('Tất cả sản phẩm')
    }
  }, [props,router.query])

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  return (
    <div>
      <Head>
        <title>All Product</title>
      </Head>
      <ToolBar isAll={true} srch={props.search}/>
      <TypeList types={props.types} isAll={true}/>
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
              {title}
            </Typography>
          </Card>

        </Grid>
        <ProductList products={products} />
        {props.length < page * 8 ? null :
          <Grid
            container
            direction="row"
            justifyContent="center"
            className={classes.grid}
          >
            <Button
              onClick={() => handleLoadmore()}
              variant="outlined"
              color="primary">
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
  const type = query.type || 'all'
  const search = query.search || 'all'

  const resultType = await getData('types?limit=all&name=all')

  const resultProduct = await getData(
    `products?limit=${page * 8}&type=${type}&name=${search}`
  )

  return {
    props: {
      types: resultType.types,
      products: resultProduct.products,
      length: resultProduct.length,
      type: type,
      search: search
    }
  }
}

export default Products
