import Dispute from '../../../models/Dispute'
import nextConnect from 'next-connect'
import User from '../../../models/User'

const handler = nextConnect()
    .get(async (req, res) => {
        try {
            const disputes = await Dispute.find({ _id: req.query.disputes.split(',') })
            console.log('DISPUTES returned')
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
            console.log('USERSSS')
            console.log(users)

            // disputes.forEach(dispute => {
            //     for (var u = 0; u < users.length; u++) {
            //         const user = users[u]

            //         switch (user._id) {
            //             case dispute.target.user:
            //                 dispute.target.display_name = user.display_name
            //                 break
            //             case dispute.killer.user:
            //                 dispute.killer.display_name = user.display_name
            //                 break
            //             default:
            //                 break
            //         }
            //     }
            // })

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

                    // if (user._id === dispute.target.user) {
                    //     console.log('florp')
                    //     targetName = user.display_name
                    // }

                    // if (user._id === dispute.killer.user) {
                    //     console.log('dorp')
                    //     killerName = user.display_name
                    // }

                    if (targetName && killerName) break
                } 

                

                // return a modified dispute object with display names

                return ({
                    ...dispute._doc,
                    killer: {
                        ...dispute.killer,
                        display_name: killerName
                    },
                    target: {
                        ...dispute.target,
                        display_name: targetName
                    }
                })
            })

            console.log('Disputes with names disputes/index.js: ')
            console.log(disputesWithNames)
            res.status(200).json({ success: true, data: disputesWithNames })

        } catch (error) {
            console.log('Could not find Disputes /api/disputes.js: ' + error)
            res.status(400).json({ success: false })
        }
    })

export default handler