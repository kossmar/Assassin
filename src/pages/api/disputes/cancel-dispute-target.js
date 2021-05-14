import nextConnect from "next-connect"
import { ASSASSIN_STATUS } from '../../../constants'
import Dispute from "../../../common/models/Dispute"
import Game from "../../../common/models/Game"

const { ALIVE, DEAD } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { dispute } = req.body
        console.log(dispute)

        try {

            // TODO: remove this whole file. Should be handled by kill-target.js so that one file can handle a target cancelling a dispute as well as a moderator deciding to kill a target

            // FIXME: probably a way to change two subdocuments in the same call
            // const game = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.target }, { $set: { 'assassins.$.status': DEAD } }, { new: true })
            // if (!game) return res.status(400).json({ success: false })

            const game1 = await Game.findOneAndUpdate({ _id: dispute.game, 'assassins.user': dispute.killer }, { $set: { 'assassins.$.status': ALIVE }, $push: { 'assassin.$.kills': dispute.target.user } }, { new: true })
            if (!game1) return res.status(400).json({ success: false })

            const game

            const dispute = await Dispute.findByIdAndDelete()

            res.status(200).json({ success: true, data: game2 })

        } catch (error) {
            console.log('Failed to cancel kill - server side' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler