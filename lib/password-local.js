import Local from 'passport-local'
import User from '../models/User'
import dbConnect from '../utils/dbConnect'

export const localStrategy = new Local.Strategy(
    {
        usernameField: 'email',
    },
    function (username, password, done) {

        dbConnect()

        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect E-mail.' });
            }
            user.authenticate(password, (err, model, passwordError) => {
                if (passwordError) {
                    return done(null, false, { message: 'Incorrect Password.' });
                } else {
                    return done(null, user);
                }
            })
        })
    })

