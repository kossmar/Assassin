import nextConnect from 'next-connect'
import Dispute from '../../../common/models/Dispute'
import Game from '../../../common/models/Game'
import { ASSASSIN_STATUS } from '../../../constants'

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {

        // FIXME: probably a way to update these things in less calls

        const { dispute } = req.body

        try {

            // find game
            const gameForTarget = await Game.findById(dispute.game)
            console.log('gameForTarget')
            console.log(gameForTarget)

            var target

            // find target's assassin profile
            for (let x = 0; x < gameForTarget.assassins.length; x++) {
                const assassin = gameForTarget.assassins[x]
                console.log('thisAssassin')
                console.log(assassin)
                if (assassin.user === dispute.target.user) {
                    target = assassin
                    break
                }
            }

            if (!target) return res.status(400).json({ success: false, errorMessage: "Could not find assassin object for target's id" })

            const isGameEnding = (gameForTarget.assassins.length <= 2)

            var killersNewTarget

            // set killer's new target
            if (isGameEnding === true) {
                killersNewTarget = ''
            } else {
                killersNewTarget = target.target
            }

            const killerQuery = { $push: { 'assassins.$.kills': dispute.target.user }, $set: { 'assassins.$.target': killersNewTarget, 'assassins.$.status': ALIVE, 'assassins.$.dispute': '' } }


            // Update Killer kills array to include Target and Assign Killer to dead Target's Target
            const game1 = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.killer.user }, killerQuery, { new: true })
            if (!game1) return res.status(400).json({ success: false, errorMessage: 'Could not update game1 in kill-target.js' })

            // Push new dead guy to Graveyard array
            const deadGuy = {
                user: target.user,
                kills: target.kills,
                death_rank: (game1.graveyard.length + 1)
            }

            var gameQuery
            if (isGameEnding === true) {
                gameQuery = { $push: { graveyard: deadGuy }, $pull: { assassins: { user: target.user }, disputes: dispute._id }, $set: { game_status: COMPLETE.STATUS } }
            } else {
                gameQuery = { $push: { graveyard: deadGuy }, $pull: { assassins: { user: target.user }, disputes: dispute._id } }
            }

            // Remove Target from Assassins array, Push new dead guy to Graveyard array, and remove dispute from disputes array
            const game = await Game.findByIdAndUpdate(dispute.game, gameQuery, { new: true })
            if (!game) return res.status(400).json({ success: false, errorMessage: 'Could not update game in adjudicate-kill.js' })

            // Delete dispute
            const disputeResult = await Dispute.findByIdAndDelete(dispute._id)
            if (!disputeResult) return res.status(400).json({ success: false, errorMessage: "Could not delete dispute in adjudicate-kill.js" })

            console.log('disputeResult')
            console.log(disputeResult)

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log('Could not adjudicate-kill dispute: ' + error)
            res.status(400).json({ success: false, errorMessage: 'Could not adjudicate-kill dispute' })
        }

    })

export default handler