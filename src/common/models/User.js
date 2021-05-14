import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true
    },
    display_name: {
        type: String,
        // required: true
    },
    profile_image: {
        data: {
            type: Buffer,
            // required: true
        },
        content_type: {
            type: String,
            // required: true
        }
    },
    games: {
        current: {
            type: [String],
            default: []
        },
        previous: {
            type: [String],
            default: []
        }
    }
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
UserSchema.plugin(findOrCreate)

export default mongoose.models.User || mongoose.model('User', UserSchema)