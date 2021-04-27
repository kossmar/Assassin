import mongoose from 'mongoose'

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

export default dbConnect

// const UserSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//   });

// export default async (req, res) => {
//     const connection = await mongoose.createConnection(
//       process.env.MONGODB_URI,
//       {
//         useNewUrlParser: true,
//         bufferCommands: false,
//         bufferMaxEntries: 0,
//         useUnifiedTopology: true,
//       }
//     );
//     try {
//       const User = connection.model("User", UserSchema);
//       const {
//         query: { name },
//         method,
//       } = req;
//       switch (method) {
//         case "POST":
//           User.create({ name }, (error, user) => {
//               console.log(user)
//           });
//           break;
//         default:
//           res.setHeader("Allow", ["POST"]);
//       }
//     } catch (e) {
//       connection.close();
//     }
//   };