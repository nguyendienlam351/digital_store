import Head from 'next/head'
import ToolBar from '../components/ToolBar'
import TypeList from '../components/TypeList'
import Type from '../models/Type'
import dbConnect from '../lib/dbConnect'
import NewProductList from '../components/NewProductList'

const Home = ({ types }) => {

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <ToolBar />
      <TypeList types={types} />
      <NewProductList/>
    </div>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
     const result = await Type.find({})
     const types = result.map((doc) => {
       const type = doc.toObject()
       type._id = type._id.toString()
       return type
     })

  return { props: { types: types } }
}

export default Home
