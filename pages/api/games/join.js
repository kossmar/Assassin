import dbConnect from "../../../utils/dbConnect"
import Game from '../../../models/Game'
import User from '../../../models/User'

export default async function handler(req, res) {

    const gameId = req.body.gameId
    const userId = req.body.userId

    await dbConnect()

    try {
        var updatedGame
        const game = await Game.findByIdAndUpdate(gameId, { $push: { join_requests: userId } }, (returnedGame) => {
            updatedGame = returnedGame
        })
        if (!game) return res.status(400).json({ success: false })
        res.status(200).json({ success: true, data: game })

    } catch (err) {
        res.status(400).json({ success: false })
    }
}