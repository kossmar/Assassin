import User from '../models/User'
import dbConnect from '../utils/dbConnect'

export async function getUsersByAssassinUserIds(assassinsArr) {

    await dbConnect()

    const assassinIds = assassinsArr.map(a => {
        return a.user
    })

    const usersResult = await User.find({ _id: [...assassinIds] })

    return usersResult
}

export function addDisplayNamesToAssassins(assassinsArr, usersArr) {

    const assassinsWithNames = assassinsArr.map(a => {
        var assassin
        usersArr.forEach(user => {
            if (user._id == a.user) {

                assassin = {
                    ...a,
                    display_name: user.display_name
                }
            }
        })
        return assassin
    })

    return assassinsWithNames
}

export async function getAndAddDisplayNamesToAssassins(assassinsArr, callback) {
    const usersArr = await getUsersByAssassinUserIds(assassinsArr)
    const assassinsWithNames = addDisplayNamesToAssassins(assassinsArr, usersArr)
    callback(assassinsWithNames)
}