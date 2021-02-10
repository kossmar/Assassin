import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import multer from 'multer'
import nextConnect from 'next-connect';
import fs from 'fs'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const uploadMiddleware = upload.single('file')


const handler = nextConnect()
    // .use(uploadMiddleware)
    .post(async (req, res) => {
        const imageBuffer = Buffer.from(req.body.image, "base64")

        try {

            const user = await User.findByIdAndUpdate(req.body.id, {
                profile_image: {
                    data: imageBuffer,
                    content_type: 'image/jpg'
                }
            }, {
                new: true,
                runValidators: true,
            })
            if (!user) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: user })
        } catch (error) {
            res.status(400).json({ success: false })
        }

    })

export default handler



// export default function handler(req, res) {

//     // console.log("SAVE BODY: " + JSON.stringify(req.body))
//     // console.log("SAVE FILES: " + (req.files))

//     // upload.single('image')(req, {}, err => {
//     //     console.log(req.files)
//     // })



//     // const user = {
//     //     ...req.body.user,
//     //     profile_image: {
//     //         data: req.body.file,
//     //         contentType: 'image/png'
//     //     }
//     // }

//     // console.log("NEW USER: " + JSON.stringify(user))
// }