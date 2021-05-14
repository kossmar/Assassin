import User from '../../../common/models/User'
import multer from 'multer'
import nextConnect from 'next-connect';

// TODO: Remove multer 

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

    // change to PUT
    .post(async (req, res) => {

        try {

            const updatedUser = await User.findByIdAndUpdate(req.body.user._id, {
                ...req.body.user
            }, {
                new: true,
                runValidators: true,
            })
            if (!updatedUser) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: updatedUser })
        } catch (error) {
            res.status(400).json({ success: false })
        }

    })

export default handler
