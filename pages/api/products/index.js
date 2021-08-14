import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const features = new APIfeatures(Product.find().sort({ _id: -1 }), req.query).paginating()

        const products = await features.query

        res.json({ 
          status: 'success',
          products,
          length: products.length
        })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
      break
    case 'POST':
      try {
        const product = await Product.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 8
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}