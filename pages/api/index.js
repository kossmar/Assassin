import Test from '../../models/Test'
import dbConnect from '../../utils/dBConnect'


export default async function handler(req, res) {
  // const { method } = req

  // await dbConnect()

  // switch (method) {
  //   case 'GET':
  //     try {
  //       const tests = await Test.find({}) /* find all the data in our database */
  //       res.status(200).json({ success: true, data: tests })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break
  //   case 'POST':
  //     try {
  //       const test = await Test.create(
  //         req.body
  //       ) /* create a new model in the database */
  //       res.status(201).json({ success: true, data: test })
  //     } catch (error) {
  //       res.status(400).json({ success: false })
  //     }
  //     break
  //   default:
  //     res.status(400).json({ success: false })
  //     break
  // }
}