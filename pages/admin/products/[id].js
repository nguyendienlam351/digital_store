import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import ProductForm from '../../../components/ProductForm'
import Layout from '../../../components/Layout'
import { getData } from '../../../lib/fetchData'
import Grid from '@material-ui/core/Grid'
import RedeemIcon from '@material-ui/icons/Redeem'

export default function Edit_Product({ types, product }) {
  return (
    <div>
      <Head>
        <title>Edit Product</title>
      </Head>
      <AdToolBar select="Quản lý sản phẩm" />
      <Layout>
        {product == null ?
          <Grid
            container
            justifyContent="center"
            direction="row"
          >
            <RedeemIcon style={{ fontSize: 400 }} />
          </Grid>
          :
          <ProductForm types={types} product={product} isNew={false} />
        }
      </Layout>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const resultType = await getData('types?limit=all&name=all')
  const product = await getData(`products/${params.id}`)

  return { props: { types: resultType.types, product: product.data || null } }
}

