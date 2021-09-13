import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import ProductForm from '../../../components/ProductForm'
import { getData } from '../../../lib/fetchData'
import withSession from '../../../lib/session'

export default function New_Product({ types }) {
  const product = {
    name: '',
    image: '',
    quantity: 1,
    type: '',
    description: '',
    price: 1,
  }
  return (
    <div>
      <Head>
        <title>New Product</title>
      </Head>
      <AdToolBar select="Quản lý sản phẩm" />
        <ProductForm types={types} product={product} isNew={true} />
    </div>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  
  const resultType = await getData('types?limit=all&name=all')

  return { props: { types: resultType.types } }
})

