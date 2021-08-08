import dbConnect from '../../../lib/dbConnect'
import Type from '../../../models/Type'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const type = await Type.findById(id)
        if (!type) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: type })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const type = await Type.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!type) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: type })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedType = await Type.deleteOne({ _id: id })
        if (!deletedType) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
