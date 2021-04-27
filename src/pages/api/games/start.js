import dbConnect from '../../../utils/dbConnect'
import Game from '../../../common/models/Game'
import nextConnect from 'next-connect'
import { GAME_STATUS } from '../../../common/constants'

const handler = nextConnect()
    .put(async (req, res) => {

        const game = req.body.game
        const targetArr = [...game.assassins]

        // Shift Target Array by one index to prevent final assassin being left with themselves as a target 
        const movingTarget = targetArr.splice(0, 1)
        targetArr.push(...movingTarget)

        // Loop through Assassin Array
        for (var x = 0; x < game.assassins.length; x++) {
            const assassin = game.assassins[x]

            // Search for a Target to assign
            for (var i = 0; i < targetArr.length; i++) {
                const target = targetArr[i]

                // Check if conditions are met for Target and Assassin
                if (assassin.user != target.user && target.target != assassin.user && assassin.user != target.target) {

                    // assign Target to Assassin
                    assassin.target = target.user
                    // Remove Target from Target Array so that it can not be assigned twice
                    targetArr.splice(i, 1)

                    // duplicate the assignment in the Target Array so that two assassins do not target eachother 
                    for (var a = 0; a < targetArr.length; a++) {
                        if (targetArr[a].user === assassin.user) {
                            targetArr[a].target = target.user
                            break;
                        }
                    }
                    break;
                }
            }
        }

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