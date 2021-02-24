import nextConnect from 'next-connect'
import Game from '../../../models/Game'
import User from '../../../models/User'

const handler = nextConnect()
    .put(async (req, res) => {
        const gameId = req.body.gameId
        const userId = req.body.userId
        console.log("KRIUNT")
        console.log(gameId + '   ' + userId)

        try {
            const game = await Game.findByIdAndUpdate(gameId, { $pull: { assassins: { user: userId } } })
            await User.findByIdAndUpdate(userId, { $pull: { current: gameId } })
            if (!game) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: game })
        } catch (error) {
            console.log("Could not leave game: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler