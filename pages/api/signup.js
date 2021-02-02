// import { redirect } from 'next/dist/next-server/server/api-utils';
import User from '../../models/User'
import passport from 'passport'
import dbConnect from '../../utils/dbConnect'


export default async function signup(req, res) {

  dbConnect()

  const { username, password } = req.body

  let promise2 = new Promise((resolve, reject) => {
    // Check if e-mail address is registered
    User.findOne({ username: username }, (err, foundUser) => {
      if (foundUser) {
        console.log("email address already in use")
        reject()
      } else {
        User.register({ username: username }, password, (err, user) => {
          if (err) {
            console.log(err);
          } else {
            resolve()
          }
          // } else {
          //   passport.authenticate("local")(req, res, function () {
          //     console.log("successfully signed up")
          //     res.redirect("/");
          //   });
          // }
        });
      }
    });
  })

  // Add things after this but also change the logic of this page. Use async functions instead of promises, probably
  let result2 = await promise2;
  res.status(200).send({ done: true })




  // try {
  //   await createUser(req.body)
  //   res.status(200).send({ done: true })
  // } catch (error) {
  //   console.error(error)
  //   res.status(500).end(error.message)
  // }
}
