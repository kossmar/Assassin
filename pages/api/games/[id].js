import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

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

        // case 'PUT' /* Edit a model by its ID */:
        //     try {
        //         const game = await Game.findByIdAndUpdate(id, req.body, {
        //             new: true,
        //             runValidators: true,
        //         })
        //         if (!game) {
        //             return res.status(400).json({ success: false })
        //         }
        //         res.status(200).json({ success: true, data: game })
        //     } catch (error) {
        //         res.status(400).json({ success: false })
        //     }
        //     break

        //   case 'DELETE' /* Delete a model by its ID */:
        //     try {
        //       const deletedPet = await Pet.deleteOne({ _id: id })
        //       if (!deletedPet) {
        //         return res.status(400).json({ success: false })
        //       }
        //       res.status(200).json({ success: true, data: {} })
        //     } catch (error) {
        //       res.status(400).json({ success: false })
        //     }
        //     break

        default:
            res.status(400).json({ success: false })
            break
    }
}