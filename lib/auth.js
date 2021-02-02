import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }

  console.log("OBJ @ setLoginSession - auth.js: \n" + JSON.stringify(obj) )

  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  // console.log("TOKEN @ setLoginSession - auth.js: \n" + token )

  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  console.log("REQ @ getLoginSession - auth.js: \n" + req  + "\n")
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  console.log("SESSION @ getLoginSession - auth.js: \n" + JSON.stringify(session)  + "\n")

  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
