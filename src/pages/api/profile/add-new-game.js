import User from '../../../common/models/User'
import nextConnect from 'next-connect';


const handler = nextConnect()
    // .use(uploadMiddleware)
    .post(async (req, res) => {

        try {

            const user = await User.findById({_id: req.body.userId})
            if (!user) {
                return res.status(400).json({ success: false })
            }
            user.games.current.push(req.body.gameId)
            await user.save()
            res.status(200).json({ success: true, data: updatedUser })
        } catch (error) {
            res.status(400).json({ success: false })
        }

    })

export default handler