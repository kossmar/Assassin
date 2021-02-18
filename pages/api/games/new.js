import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import Pet from '../../../models/Pet'
import User from '../../../models/User'


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {

        case 'POST':
            try {
                const game = await Game.create(
                    req.body.game
                ) /* create a new model in the database */
                const user = await User.findByIdAndUpdate(req.body.userId, {current: game._id}, {
                    new: true,
                    runValidators: true,
                })                
                res.status(201).json({ success: true, data: game })

            } catch (error) {
                console.log("ERREUR " + error)
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}