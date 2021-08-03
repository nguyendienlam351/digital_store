import React from 'react'
import Head from 'next/head'
import ToolBar from '../../components/ToolBar'
import DetailProduct from '../../components/DetailProduct'
import Product from '../../models/Product'
import dbConnect from '../../lib/dbConnect'
import Type from '../../models/Type'

export default function Detail_Product({ type, product }) {
    return (
        <div>
        <Head>
          <title>Detail Product</title>
        </Head>
        <ToolBar />
            <DetailProduct type={type} product={product}/>
        </div>
    )
}

export async function getServerSideProps({ params }) {

    await dbConnect()
    
    const product = await Product.findById(params.id).lean()
    product._id = product._id.toString()

    const type = await Type.findById(product.type).lean()
    type._id = type._id.toString()

    return { props: { type: type, product: product} }
  }