import dbConnect from "../../../utils/dbConnect"
import Game from '../../../models/Game'

export default async function handler(req, res) {

    const gameId = req.body.gameId
    const userId = req.body.userId
    const role = req.body.role

    const joinRequest = { user: userId }

    await dbConnect()

    try {
        var game
        switch (role) {
            case 'assassin':
                game = await Game.findByIdAndUpdate(gameId, { $push: { 'join_requests.assassins': joinRequest } }, { new: true })
                break
            case 'moderator':
                game = await Game.findByIdAndUpdate(gameId, { $push: { 'join_requests.moderators': joinRequest } }, { new: true })
                break
            default:
                break
        }

        if (!game) return res.status(400).json({ success: false })

        res.status(200).json({ success: true, data: game })

    } catch (err) {
        res.status(400).json({ success: false })
    }
}