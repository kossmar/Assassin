import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Game from '../../../models/Game'
import User from '../../../models/User'

const handler = nextConnect()
    .put(async (req, res) => {

        const gameId = req.body.gameId
        const userId = req.body.userId

        const newAssassin = {
            user: userId,
            target: null,
            is_waiting: false,
            kills: [],
            is_alive: true,
            dispute: null,
            rank_index: null
        }
        try {
            console.log("NEW ASS")
            console.log(newAssassin)
            var updatedGame
            const game = await Game.findByIdAndUpdate(gameId, { $push: { assassins: newAssassin }, $pull: { join_requests: userId } }, { new: true })
            console.log("game from findByIdAndUpdate")
            console.log(game)

            const user = await User.findByIdAndUpdate(userId, { $push: { 'games.current': gameId } }, {
                new: true,
                runValidators: true,
            })
            console.log("usah")
            console.log(user)

            if (!game || !user) {
                return res.status(400).json({ success: false })
            }



            res.status(200).json({ success: true, data: game })
        } catch (error) {
            console.log("Could not approve request to join: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler