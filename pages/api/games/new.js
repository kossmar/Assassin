import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import Pet from '../../../models/Pet'
import User from '../../../models/User'


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const pets = await Pet.find({}) /* find all the data in our database */
                res.status(200).json({ success: true, data: pets })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            console.log("GAME BODYYYY: " + JSON.stringify(req.body.game))
            try {
                const game = await Game.create(
                    req.body.game
                ) /* create a new model in the database */
                const user = await User.findByIdAndUpdate(req.body.userId, {current: game._id}, {
                    new: true,
                    runValidators: true,
                })                
                res.status(201).json({ success: true, data: game })
                // res.json(game)
                // console.log("RES JSON: " + res.json())
                // res.send(game)
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