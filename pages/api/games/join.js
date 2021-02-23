import dbConnect from "../../../utils/dbConnect"
import Game from '../../../models/Game'
import User from '../../../models/User'

export default async function handler(req, res) {

    const gameId = req.body.gameId
    const userId = req.body.userId

    console.log("DONG:")
    console.log(gameId)
    console.log(userId)

    await dbConnect()

    try {
        const foundGame = await Game.findByIdAndUpdate(gameId, { $push: { join_requests: userId } })
        if (!foundGame) return res.status(400).json({ success: false })

        res.status(200).json({ success: true})
    } catch (err) {
        res.status(400).json({ success: false })
    }
}