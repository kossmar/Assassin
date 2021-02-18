import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'
import User from '../../../models/User'


export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    try {
        await dbConnect()
    } catch (error) {
        console.log(error)
    }

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const game = await Game.findById(id)
                if (!game) {
                    console.log("FUCK")
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: game })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT' /* Edit a model by its ID */:
            try {
                console.log("BODY @ PUT: " + JSON.stringify(req.body))
                const game = await Game.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!game) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: game })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {

                const foundUsers = await User.find({ 'games.current': id })
                console.log("USERS")
                console.log(foundUsers)

                foundUsers.forEach( async (user) => {
                    const tits = await User.findByIdAndUpdate({ _id: user._id }, { '$pull': { 'games.current': id } })
                    console.log(tits)
                })

                const deletedGame = await Game.deleteOne({ _id: id })
                if (!deletedGame) {
                    return res.status(400).json({ success: false })
                }


                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}