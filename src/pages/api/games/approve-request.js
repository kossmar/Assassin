import nextConnect from 'next-connect'
import Game from '../../../common/models/Game'
import User from '../../../common/models/User'
import { ASSASSIN_STATUS } from '../../../common/constants'

const handler = nextConnect()
    .put(async (req, res) => {

        const gameId = req.body.gameId
        const userId = req.body.userId
        const role = req.body.role

        const newAssassin = {
            user: userId,
            target: null,
            is_waiting: false,
            kills: [],
            status: ASSASSIN_STATUS.ALIVE,
            dispute: null,
            rank_index: null
        }
        try {
            var game
            switch (role) {
                case 'assassin':
                    game = await Game.findByIdAndUpdate(gameId, { $push: { assassins: newAssassin }, join_requests: { $pull: { assassins: userId } } }, { new: true })
                    break
                case 'moderator':
                    game = await Game.findByIdAndUpdate(gameId, { $push: { assassins: newAssassin }, $pull: { 'join_requests.moderators': userId } }, { new: true })
                    break
            }

            const user = await User.findByIdAndUpdate(userId, { $push: { 'games.current': gameId } }, {
                new: true,
                runValidators: true,
            })


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