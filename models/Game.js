import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    creator: String,
    creator_role: String,
    game_name: String,
    weapons: String,
    safe_zones: String,
    moderators: [String],
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
    game_status: String,
    benchwarmers: [String],
    join_requests: {
        assassins: [
            {
                _id: false,
                user: String,
                role: String
            }
        ],
        moderators: [
            {
                _id: false,
                user: String,
                role: String
            }
        ],
    },
    winner: String,
    invite_assassin_URL: String,
    invite_moderator_URL: String
})

export default mongoose.models.Game || mongoose.model('Game', GameSchema)