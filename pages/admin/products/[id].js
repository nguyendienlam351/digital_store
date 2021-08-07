import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import ProductForm from '../../../components/ProductForm'
import Type from '../../../models/Type'
import Product from '../../../models/Product'
import dbConnect from '../../../lib/dbConnect'

export default function Edit_Product({ types, product }) {
    return (
        <div>
        <Head>
          <title>Edit Product</title>
        </Head>
        <AdToolBar />
            <ProductForm types={types} product={product} isNew={false}/>
        </div>
    )
}

export async function getServerSideProps({params}) {
    await dbConnect()
  
    /* find all the data in our database */
    const resultType = await Type.find({})
    const types = resultType.map((doc) => {
      const type = doc.toObject()
      type._id = type._id.toString()
      return type
    })

    const product = await Product.findById(params.id).lean()
    product._id = product._id.toString()
  
    return { props: { types: types, product: product} }
  }

