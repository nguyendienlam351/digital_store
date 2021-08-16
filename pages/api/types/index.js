import dbConnect from '../../../lib/dbConnect'
import Type from '../../../models/Type'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const features = new APIfeatures(Type.find(), req.query).filtering().paginating()

        const types = await features.query

        res.json({ 
          status: 'success',
          length: types.length,
          types 
        })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
      break
    case 'POST':
      try {
        const type = await Type.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: type })
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
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    if (this.queryString.limit == 'all') {return this}

    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 8
    const skip = (page - 1) * limit;
    this.query = this.query.sort({ _id: -1 }).skip(skip).limit(limit)
    return this;
  }

  filtering() {
    const queryObj = { ...this.queryString }
    
    const excludeFields = ['page', 'limit']
    excludeFields.forEach(el => delete(queryObj[el]))
    
    if (queryObj.name !== 'all')
      this.query.find({ name: { $regex: queryObj.name } })

    this.query.find()
    return this;
  }
}
