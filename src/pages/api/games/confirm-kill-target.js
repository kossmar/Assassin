import nextConnect from 'next-connect'
import Game from '../../../common/models/Game'

import { ASSASSIN_STATUS, GAME_STATUS } from '../../common/constants'

const { DEAD } = ASSASSIN_STATUS
const { COMPLETE } = GAME_STATUS

// TODO: Assign Killer to dead Target's Target

const handler = nextConnect()
    .put(async (req, res) => {
        const { gameId, target, killer } = req.body
        console.log("CONFIRM KILL BODY (from target) - server side:")
        console.log(gameId)
        console.log(target)
        console.log(killer)

        try {

            const game2 = await Game.findById(gameId)
            const isGameEnding = (game2.assassins.length <= 2)

            var killerQuery
            if (isGameEnding === true) {
                killerQuery = { $push: { 'assassins.$.kills': target.user }, $set: { 'assassins.$.target': '' }  }
            } else {
                killerQuery = { $push: { 'assassins.$.kills': target.user }, $set: { 'assassins.$.target': target.target } }
            }

            // Update Killer kills array to include Target and Assign Killer to dead Target's Target
            const killerGame = await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': killer.user }, killerQuery, { new: true })
            if (!killerGame) return res.status(400).json({ success: false, errorMessage: 'Could not update killerGame in confirm-kill-target.js' })

            // Push new dead guy to Graveyard array
            const deadGuy = {
                user: target.user,
                kills: target.kills,
                death_rank: (game2.graveyard.length + 1)
            }

            var gameQuery
            if (isGameEnding === true) {
                gameQuery = { $push: { graveyard: deadGuy }, $pull: { assassins: { user: target.user } }, $set: { game_status: COMPLETE.STATUS } }
            } else {
                gameQuery = { $push: { graveyard: deadGuy }, $pull: { assassins: { user: target.user } } }
            }

            // Remove Target from Assassins array, add new dead guy to Graveyard array,
            const game = await Game.findByIdAndUpdate(gameId, gameQuery, { new: true })
            if (!game) return res.status(400).json({ success: false })

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log("Could not confirm kill by assassin - server side: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler