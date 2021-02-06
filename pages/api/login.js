import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../lib/password-local'
import { setLoginSession } from '../../lib/auth'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
      // const session = { ...user } THIS WAS THE ORIGINAL working code but it stopped working when I began adding photos
      // From my understanding, I only need to pass username for token authentication. Keeping this for ref until I understand better
      
      // console.log("\n\n\nSESSION FROM USER: \n" + JSON.stringify(session._doc.username) + "\n\n\n")
      const session = {username: user._doc.username}

      await setLoginSession(res, session)
      // console.log("REZZZZ: " + res)

      // console.log("SESSION - api/login: " + session)

      res.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  })
