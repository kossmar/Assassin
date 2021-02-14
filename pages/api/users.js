import User from '../../models/User'
import dbConnect from '../../utils/dbConnect'

export default async function users(req, res) {
    const { method } = req

    try {
        await dbConnect()
    } catch (error) {
        console.log(error)
    }

    switch (method) {
        case 'GET': /* get users by array of IDs */
        console.log("QUERY: " + JSON.stringify(req.query.users))
            try {
                const usersResult = await User.find({ _id: req.query.users })
                if (!usersResult) {
                    res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: usersResult })

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}