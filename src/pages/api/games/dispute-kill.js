import Dispute from '../../../common/models/Dispute'
import Game from '../../../common/models/Game'
import nextConnect from 'next-connect'
import { ASSASSIN_STATUS } from '../../../common/constants'

const { DISPUTE } = ASSASSIN_STATUS

const handler = nextConnect()
    .post(async (req, res) => {
        const { gameId, targetId, comment, killerId } = req.body

        const disputeObj = {
            game: gameId,
            killer: {
                user: killerId,
                comment: null
            },
            target: {
                user: targetId,
                comment: comment
            }
        }

        try {
            const dispute = await Dispute.create(disputeObj)

            if (!dispute) return res.status(400).json({ success: false })
            const game = await Game.findById(gameId)

            if (!game) return res.status(400).json({ success: false })


            // Create new assassins array. If assassin is TARGET or KILLER, update their DISPUTE
            // probably a better way to do this exclusively with mongo but I'm tryna finish here
            const updatedAssassinsArr = []
            for (var x = 0; x < game.assassins.length; x++) {

                const assassin = game.assassins[x]

                if (assassin.user === targetId || assassin.user === killerId) {
                    assassin.dispute = dispute._id
                    assassin.status = DISPUTE
                    updatedAssassinsArr.push(assassin)
                    continue
                }

                updatedAssassinsArr.push(assassin)

            }

            const updatedGame = await Game.findByIdAndUpdate(gameId, { $set: { assassins: updatedAssassinsArr } }, { new: true })
            const updatedGame2 = await Game.findByIdAndUpdate(gameId, { $push: { disputes: dispute._id } }, { new: true })

            if (!updatedGame || !updatedGame2) return res.status(400).json({ success: false })

            res.status(200).json({ success: false, data: game })


        } catch (error) {
            console.log('Could not dispute kill - server side: ' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler

