import withSession from '../../../lib/session'
import User from '../../../models/User'
import dbConnect from '../../../lib/dbConnect'

export default withSession(async (req, res) => {
  await dbConnect()
  const { user_name, password } = req.body

  try {
    const resultUser = await User.findOne({ user_name })

    if (!resultUser) return res.status(400).json({ err: 'This user does not exist.' })

    if (password !== resultUser.password) return res.status(400).json({ err: 'Incorrect password.' })

    const user = { isLoggedIn: true, resultUser }


    req.session.set('user', user)
    await req.session.save()
    res.json(user)

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }

})