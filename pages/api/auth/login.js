import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import { createAccessToken, createRefreshToken } from '../../../lib/generateToken'


dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        const { user_name, password } = req.body

        const user = await User.findOne({ user_name })
        if (!user) return res.status(400).json({ err: 'This user does not exist.' })

        if (password !== user.password) return res.status(400).json({ err: 'Incorrect password.' })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user: {
                user_name: user.user_name,
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}