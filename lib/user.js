
import dbConnect from "../utils/dbConnect"
import User from '../models/User'

// Here you should lookup for the user in your DB
export async function findUser(session) {

    const email = session.email
    console.log("USERNAME from session.username @ /lib/user.js")
    console.log(email)

    dbConnect()

    const user = await User.findOne({ email: email }, (err, user) => {

        console.log("\nUSER @ /lib/user.js")
        console.log(user)
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

