
import dbConnect from "../utils/dbConnect"
import User from '../models/User'

// Here you should lookup for the user in your DB
export async function findUser(session) {

    const username = session._doc.username

    dbConnect()

    const user = await User.findOne({ username: username }, (err, user) => {

        if (err) {
            console.log(err)
            return done(err);
        }
        if (!user) {
            console.log("NO USER")
            return done("NO SUCH USER!");
        }
        return user
    })

    return user

}

