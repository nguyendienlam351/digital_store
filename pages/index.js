import Head from 'next/head'
import ToolBar from '../components/ToolBar'
import TypeList from '../components/TypeList'
import Type from '../models/Type'
import Product from '../models/Product'
import dbConnect from '../lib/dbConnect'
import NewProductList from '../components/NewProductList'

const Home = ({ types, products  }) => {

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <ToolBar />
      <TypeList types={types} />
      <NewProductList products={products} />
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

     const resultProduct = await Product.find({}).sort({_id: -1}).limit(8)
     const products = resultProduct.map((doc) => {
       const product = doc.toObject()
       product._id = product._id.toString()
       return product
     })


  return { props: { types: types , products: products } }
} 

export default Home
