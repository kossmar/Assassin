import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import nextConnect from 'next-connect'
import { gameStatus } from '../../../constants'

const handler = nextConnect()
    .put(async (req, res) => {
        const gameId = req.body.gameId
        console.log("gameId: " + gameId)
        try {
            const game = await Game.findByIdAndUpdate(gameId, { campaign_status: gameStatus.ACTIVE }, {
                new: true,
                runValidators: true
            })

            if (!game) {
                res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log("Could not start game: " + error)
            res.status(400).json({ success: false })
        }
    })

    export default handler