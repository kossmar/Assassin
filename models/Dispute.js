import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const DisputeSchema = new mongoose.Schema({
    game: String,
    killer: {
        user: String,
        comment: String
    },
    target: {
        user: String,
        comment: String
    },
    killerHasResponded: {
        type: Boolean,
        default: false
    }
})

export default mongoose.models.Dispute || mongoose.model('Dispute', DisputeSchema)