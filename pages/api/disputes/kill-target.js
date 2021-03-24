import nextConnect from 'next-connect'
import Dispute from '../../../models/Dispute'
import Game from '../../../models/Game'
import { ASSASSIN_STATUS } from '../../../constants'

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {

        // FIXME: probably a way to update these things in less calls

        const { dispute } = req.body

        try {

            // 
            const gameForTarget = await Game.findById(dispute.game)
            console.log('gameForTarget')
            console.log(gameForTarget)
            var target

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

            console.log('Target')
            console.log(target)

            // Update Killer kills array to include Target and Assign Killer to dead Target's Target
            const game1 = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.killer.user }, { $push: { 'assassins.$.kills': dispute.target.user }, $set: { 'assassins.$.target': target.target, 'assassins.$.status': ALIVE, 'assassin.$.dispute': '' } }, { new: true })
            if (!game1) return res.status(400).json({ success: false, errorMessage: 'Could not update game1 in adjudicate-kill.js' })
            console.log('game1')
            console.log(game1)

            // Push new dead guy to Graveyard array
            const deadGuy = {
                user: target.user,
                kills: target.kills,
                death_rank: (game1.graveyard.length + 1)
            }

            console.log('deadGuy')
            console.log(deadGuy)

            // Remove Target from Assassins array, Push new dead guy to Graveyard array, and remove dispute from disputes array
            const game = await Game.findByIdAndUpdate(dispute.game, { $push: { graveyard: deadGuy }, $pull: { assassins: { user: target.user }, disputes: dispute._id } }, { new: true })
            if (!game) return res.status(400).json({ success: false, errorMessage: 'Could not update game in adjudicate-kill.js' })

            console.log('game')
            console.log(game)

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