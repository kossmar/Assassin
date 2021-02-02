import { getLoginSession } from '../../lib/auth'
import { findUser } from '../../lib/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req)
    console.log("SESSION returned from getLoginSession - api/user.js: \n" + JSON.stringify(session) + "\n")

    const user = (session && (await findUser(session))) ?? null
    console.log("USER returned from findUser - api/user.js: \n" + user + "\n")

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
