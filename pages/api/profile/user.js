import { getLoginSession } from '../../../lib/auth'
import { findUser } from '../../../lib/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req)
    console.log("SESSION @ /profile/user.js")
    console.log(session)

    const user = (session && (await findUser(session))) ?? null
    console.log("USER @ /profile/user.js")
    console.log(user._id)

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
