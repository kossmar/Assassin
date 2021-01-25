import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import Pet from '../../../models/Pet'
import Test from '../../../models/Test'

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
            try {
                const test = await Game.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: test })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}