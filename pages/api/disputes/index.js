import Dispute from '../../../models/Dispute'
import nextConnect from 'next-connect'

const handler = nextConnect()
    .get(async (req, res) => {
        console.log("SOGGU!")
        console.log("QUERY: " + JSON.stringify(req.query.disputes))
        try {
            const dispute = await Dispute.findById(req.query.disputes.split(','))
            
            if (!dispute) return res.status(400).json({ success: false })
            
            res.status(200).json({ success: true, data: dispute })

        } catch (error) {
            console.log('Could not find Disputes /api/disputes.js: ' + error)
            res.status(400).json({ success: false })
        }
    })

export default handler