import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import nextConnect from 'next-connect'
import { GAME_STATUS } from '../../../constants'

const handler = nextConnect()
    .put(async (req, res) => {

        const game = req.body.game
        const targetArr = [...game.assassins]


        game.assassins.forEach(assassin => {
            // select random target from targetArr, set it as target for this assassin and remove it from targetArr
            const index = Math.floor(Math.random() * targetArr.length)
            const target = targetArr[index];
            assassin.target = target
            targetArr.splice(index, 1)
        })

        try {
            const returnedGame = await Game.findByIdAndUpdate(game._id, { assassins: game.assassins, game_status: GAME_STATUS.ACTIVE.STATUS }, {
                new: true,
                runValidators: true
            })

            if (!returnedGame) {
                res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true, data: game })

        } catch (error) {
            console.log("Could not start game: " + error)
            res.status(400).json({ success: false })
        }
    })

export default handler