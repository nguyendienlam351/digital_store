import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import ProductForm from '../../../components/ProductForm'
import Type from '../../../models/Type'
import dbConnect from '../../../lib/dbConnect'

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
        <AdToolBar />
            <ProductForm types={types} product={product} isNew={true}/>
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
  
    return { props: { types: types} }
  }

