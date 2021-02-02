import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    // image: URL
})

UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)

export default mongoose.models.User || mongoose.model('User', UserSchema)