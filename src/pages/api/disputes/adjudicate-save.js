import nextConnect from 'next-connect'
import Dispute from '../../../common/models/Dispute'
import Game from '../../../common/models/Game'
import { ASSASSIN_STATUS } from '../../../constants'

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {

        // FIXME: probably a way to update these things in less calls

        const { gameId, target, killer, dispute } = req.body

        try {

            // Update KILLER's status to ALIVE
            const killerGame = await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': killer.user }, { $set: { 'assassin.$.status': ALIVE } }, { new: true })
            if (!killerGame) return res.status(400).json({ success: false, errorMessage: "Could not update killer's status in adjudicate-save.js" })

            // Update TARGET's status to ALIVE
            const targetGame = await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': target.user }, { $set: { 'assassin.$.status': ALIVE } }, { new: true })
            if (!targetGame) return res.status(400).json({ success: false, errorMessage: "Could not update target's status in adjudicate-save.js" })
        
            // Delete dispute
            const disputeResult = await Dispute.findByIdAndDelete(dispute._id)
            if (!disputeResult) return res.status(400).json({ success: false, errorMessage: "Could not delete dispute in adjudicate-save.js" })

        } catch (error) {
            console.log('Could not adjudicate-save dispute: ' + error)
            res.status(400).json({success: false, errorMessage: 'Could not adjudicate-save dispute'})
        }



    })

export default handler