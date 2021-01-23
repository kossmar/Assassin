import mongoose from 'mongoose'

const CampaignSchema = new mongoose.Schema({
    campaignId: {
        type: String,
        required: true
    },
    campaignName: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    moderator: String,
    assassins: {
        type: [
            {
                userId: {
                    type: String,
                    required: true
                },
                targetId: {
                    type: String,
                    required: true
                },
                isWaiting: {
                    type: Boolean,
                    required: true
                },
                kills: {
                    type: [String],
                    required: true
                },
                isAlive: {
                    type: Boolean,
                    required: true
                },
                dispute: {
                    type: string,
                    required: true
                },
                rankIndex: Int
            }
        ]
    },
    benchwarmers: [String],
    status: {
        type: String,
        required: true
    },
    weapons: {
        type: String,
        require: true
    },
    safeZones: {
        type: String,
        require: true
    },
    winner: String,
    inviteAssassinURL: String,
    inviteModeratorURL: String
})

export default mongoose.models.Campaign || mongoose.model('Test', CampaignSchema)
