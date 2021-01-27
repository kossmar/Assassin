import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    creator: String,
    game_name: String,
    weapons: String,
    safe_zones: String,
    moderator: String,
    assassins: [
        { 
            _id: false,
            user: String,
            target: String,
            is_waiting: Boolean,
            kills: [String],
            is_alive: Boolean,
            dispute: String,
            rank_index: Number
        }
    ],
    campaign_status: String,
    benchwarmers: String,
    winner: String,
    invite_assassin_URL: String,
    invite_moderator_URL: String
})

export default mongoose.models.Game || mongoose.model('Game', GameSchema)