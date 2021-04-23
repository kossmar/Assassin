import mongoose from 'mongoose'

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