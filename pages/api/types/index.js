import dbConnect from '../../../lib/dbConnect'
import Type from '../../../models/Type'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const types = await Type.find({}).limit(8) /* find all the data in our database */
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
