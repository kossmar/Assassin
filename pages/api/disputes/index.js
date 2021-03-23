import Dispute from '../../../models/Dispute'
import nextConnect from 'next-connect'
import User from '../../../models/User'

const handler = nextConnect()
    .get(async (req, res) => {
        try {
            const disputes = await Dispute.find({ _id: req.query.disputes.split(',') })
            console.log('DISPUTEs')
            console.log(disputes)
            if (!disputes) return res.status(400).json({ success: false })

            // create an array of user IDs to request User objects from the db
            const userArr = []
            disputes.forEach(dispute => {
                userArr.push(dispute.target.user)
                userArr.push(dispute.killer.user)
            })


            // Query the db for users in the disputes array
            const users = await User.find({ _id: userArr })
            if (!users) return res.status(400).json({ success: false })

            // Match User display names to their respective assassins in each dispute
            const disputesWithNames = disputes.map(dispute => {

                var targetName
                var killerName

                for (var u = 0; u < users.length; u++) {
                    const user = users[u]

                    const userId = user._id.toString()

                    switch (userId) {
                        case (dispute.target.user):
                            targetName = user.display_name
                            break
                        case (dispute.killer.user):
                            killerName = user.display_name
                            break
                        default:
                            break
                    }

                    if (targetName && killerName) break
                } 

                

                // return a modified dispute object with display names
                return ({
                    ...dispute._doc,
                    killer: {
                        user: dispute.killer.user,
                        comment: dispute.killer.comment,
                        display_name: killerName,
                    },
                    target: {
                        user: dispute.target.user,
                        comment: dispute.target.comment,
                        display_name: targetName
                    }
                })
            })

            res.status(200).json({ success: true, data: disputesWithNames })

        } catch (error) {
            console.log('Could not find Disputes /api/disputes.js: ' + error)
            res.status(400).json({ success: false })
        }
    })

export default handler