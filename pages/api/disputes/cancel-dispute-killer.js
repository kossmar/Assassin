import nextConnect from "next-connect"
import { ASSASSIN_STATUS } from "../../../constants"
import Dispute from "../../../models/Dispute"
import Game from "../../../models/Game"

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { dispute, isKiller } = req.body
        console.log(dispute)
        
        try {

            // FIXME: probably a way to change two subdocuments in the same call
            const game = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.target }, { $set: { 'assassins.$.status': ALIVE } }, { new: true })
            if (!game) return res.status(400).json({ success: false })

            const game2 = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.killer }, { $set: { 'assassins.$.status': ALIVE } }, { new: true })
            if (!game2) return res.status(400).json({ success: false })

            const dispute = await Dispute.findByIdAndDelete()

            res.status(200).json({ success: true, data: game2 })

        } catch (error) {
            console.log('Failed to cancel kill - server side' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler