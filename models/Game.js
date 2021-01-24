import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    creator: String,
    campaign_name: String,
    weapons: String,
    safe_zones: String,
    moderator: String,
    assassins: [
        { userId: String }
    ],
    campaign_status: String
})

export default mongoose.models.Game || mongoose.model('Game', GameSchema)