import User from '../../../common/models/User'
import nextConnect from 'next-connect';

const handler = nextConnect()
    // .use(uploadMiddleware)
    .post(async (req, res) => {

        const { gameId, userId } = req.body
        try {

            const user = await User.findByIdAndUpdate(userId, { $push: { 'games.current': gameId } })
            if (!user) {
                return res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true })
        } catch (error) {
            console.log(`Error updating current games for user : ${userId}` + error)
            res.status(400).json({ success: false })
        }

    })

export default handler