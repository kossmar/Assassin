import nextConnect from 'next-connect'
import Game from '../../../common/models/Game'
import { ASSASSIN_STATUS } from '../../../common/constants'

const { PURGATORY } = ASSASSIN_STATUS

const handler = nextConnect()
    .put(async (req, res) => {
        const { gameId, target } = req.body
        console.log("CONFIRM KILL BODY - server side:")
        console.log(gameId)
        console.log(target)

        try {
            const game = await Game.findOneAndUpdate({ _id: gameId, 'assassins.user': target.user }, { $set: { 'assassins.$.status': PURGATORY } }, { new: true })

            if (!game) return res.status(400).json({ success: false })

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log("Could not confirm kill by assassin - server side: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler