import nextConnect from "next-connect"
import { ASSASSIN_STATUS } from "../../../constants"
import Dispute from "../../../models/Dispute"
import Game from "../../../models/Game"

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { dispute } = req.body
        console.log('SUP')
        console.log(dispute)

        try {

            // FIXME: probably a way to change two subdocuments in the same call

            const game = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.target.user }, { $set: { 'assassins.$.status': ALIVE, 'assassins.$.dispute': '' } }, { new: true })
            if (!game) return res.status(400).json({ success: false })

            console.log('game')
            console.log(game)

            const game2 = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.killer.user }, { $set: { 'assassins.$.status': ALIVE, 'assassins.$.dispute': '' } }, { new: true })
            if (!game2) return res.status(400).json({ success: false })
            console.log('game2')
            console.log(game2)
            const game3 = await Game.findByIdAndUpdate(dispute.game, { $pull: { disputes: dispute._id } }, { new: true })
            if (!game3) return res.status(400).json({ success: false })
            console.log('game3')
            console.log(game3)
            const disputeResult = await Dispute.findByIdAndDelete(dispute._id)
            if (!disputeResult) return res.status(400).json({ success: false })
            console.log('disputeResult')
            console.log(disputeResult)
            res.status(200).json({ success: true, data: game3 })

        } catch (error) {
            console.log('Failed to cancel kill - server side: ' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler