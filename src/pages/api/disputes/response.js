import Dispute from '../../../common/models/Dispute'
import nextConnect from 'next-connect'



const handler = nextConnect()
    .put(async (req, res) => {
        const { response, disputeId } = req.body

        try {

            const dispute = await Dispute.findByIdAndUpdate(disputeId, { $set: { killerHasResponded: true, 'killer.comment': response } })

            if (!dispute) return res.status(400).json({ success: false })

            res.status(200).json({ success: false, data: dispute })


        } catch (error) {
            console.log('Could not respond to dispute - server side: ' + error)
            res.status(400).json({ success: false })
        }

    })

export default handler

