import dbConnect from '../../../lib/dbConnect'
import Bill from '../../../models/Bill'
import Product from '../../../models/Product'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const features = new APIfeatures(Bill.find().sort({ _id: -1 }), req.query).filtering().paginating()

        const bills = await features.query

        res.json({
          status: 'success',
          length: bills.length,
          bills
        })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
      break
    case 'POST':
      try {
        const bill = await Bill.create(
          req.body
        )

        req.body.product.filter(item => {
          return sold(item._id, item.quantity, item.cart_quantity)
        })

        res.status(201).json({ success: true, data: bill })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

const sold = async (id, quantity, cart_quantity) => {
  await Product.findOneAndUpdate({ _id: id }, {
    quantity: quantity - cart_quantity,
  })
}

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {

    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 8
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }

  filtering() {
    const queryObj = { ...this.queryString }

    if (queryObj.name !== 'all')
      this.query.find({ name: { $regex: queryObj.name } })

    this.query.find()
    return this;
  }
}
