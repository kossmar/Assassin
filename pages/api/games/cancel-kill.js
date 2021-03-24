import nextConnect from "next-connect"
import { ASSASSIN_STATUS } from "../../../constants"
import Game from "../../../models/Game"

const { ALIVE } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { gameId, target } = req.body
        console.log(target)
        try {

            const game = await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': target.user }, { $set: { 'assassins.$.status': ALIVE } }, { new: true })
            if (!game) return res.status(400).json({ success: false })

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log('Failed to cancel kill - server side' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler