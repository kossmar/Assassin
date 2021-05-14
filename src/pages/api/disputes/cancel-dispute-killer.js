import nextConnect from "next-connect"
import { ASSASSIN_STATUS } from '../../../constants'
import Dispute from "../../../common/models/Dispute"
import Game from "../../../common/models/Game"

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { dispute, isKiller } = req.body
        console.log(dispute)

        try {

            // FIXME: probably a way to change two subdocuments in the same call
            // TODO: remove this whole file. Should be handled by save-target.js so that one file can handle a killer cancelling a dispute as well as a moderator deciding to save a target

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