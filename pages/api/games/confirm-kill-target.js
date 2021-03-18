import nextConnect from 'next-connect'
import Game from '../../../models/Game'
import User from '../../../models/User'

import { ASSASSIN_STATUS } from '../../../constants'

const { DEAD } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { gameId, target, killer } = req.body
        console.log("CONFIRM KILL BODY (from target) - server side:")
        console.log(gameId)
        console.log(target)
        console.log(killer)

        try {
            // Update Target Status to DEAD
            await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': target._id }, { $set: { 'assassins.$.status': DEAD } }, { new: true })

            // Update Killer kills array to include Target
            const game = await Game.findOneAndUpdate({ _id: killer.user, 'assassins.user': killer.user }, { $push: { 'assassins.$.kills': target._id } }, { new: true })

            if (game) return res.status(400).json({ success: false })

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log("Could not confirm kill by assassin - server side: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler