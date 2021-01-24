import mongoose from 'mongoose'

const FuckSchema = new mongoose.Schema({
    name: String
})

export default mongoose.models.Fuck || mongoose.model('Fuck', FuckSchema)