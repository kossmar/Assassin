import dbConnect from '../../../utils/dbConnect'
import Game from '../../../common/models/Game'
import User from '../../../common/models/User'
import { completeBase64ImageURL } from '../../../common/helpers/encoder'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    try {
        await dbConnect()
    } catch (error) {
        console.log(error)
    }

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const game = await Game.findById(id)
                if (!game) {
                    return res.status(400).json({ success: false })
                }

                // TODO: Add Benchwarmers to this

                // Get names and images for assassins
                const assassinsWithNamesAndImages = await getPlayerNamesAndImages(game.assassins)

                // // Get names and images for moderators
                const moderatorsWithNamesAndImages = await getModeratorNamesAndImages(game.moderators)

                // Get names and images for graveyard
                const graveyardWithNamesAndImages = await getPlayerNamesAndImages(game.graveyard)

                // Get names for join requests
                const requestsWithNames = await getRequestDisplayNames(game.join_requests)

                const updatedGame = {
                    ...game._doc,
                    assassins: assassinsWithNamesAndImages,
                    moderators: moderatorsWithNamesAndImages,
                    graveyard: graveyardWithNamesAndImages,
                    join_requests: requestsWithNames
                }

                res.status(200).json({ success: true, data: updatedGame })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT' /* Edit a model by its ID */:

            const { game_details, user, isRoleUpdated, isRoleModerator } = req.body.gameDetailsObj

            // create mongo query
            const query = {
                $set: {
                    game_details: game_details
                }
            }

            if (isRoleUpdated) {

                if (isRoleModerator) {
                    // if user is switching to moderator, push userId to moderators array and pull user's assassin object from assassins array

                    query.$push = {
                        moderators: user
                    }
                    query.$pull = {
                        assassins: {
                            user: user
                        }
                    }

                } else {
                    // if user is switching to assassin, pull userId from moderators array and push new user's assassin object to assassins array

                    query.$push = {
                        assassins: {
                            user: user,
                            kills: [],
                            target: '',
                            isWaiting: false,
                            is_alive: true,
                            dispute: '',
                            rank_index: 0
                        }
                    }
                    query.$pull = {
                        moderators: user
                    }

                }
            }

            try {
                // Find game object on db

                const updatedGame = await Game.findByIdAndUpdate(id, query, {
                    new: true,
                    runValidators: true,
                })
                if (!updatedGame) {
                    return res.status(400).json({ success: false })
                }   

                res.status(200).json({ success: true, data: updatedGame })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {

                // TODO: delete any existing disputes

                const foundUsers = await User.find({ 'games.current': id })
                console.log(foundUsers)

                foundUsers.forEach(async (user) => {
                    const tits = await User.findByIdAndUpdate({ _id: user._id }, { '$pull': { 'games.current': id } })
                    console.log(tits)
                })

                const deletedGame = await Game.deleteOne({ _id: id })
                if (!deletedGame) {
                    return res.status(400).json({ success: false })
                }


                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}

async function getPlayerNamesAndImages(playerArr) {

    // get users IDs for players
    const userIds = playerArr.map(player => {
        return player.user
    })

    // get user objects for each assassin's user ID
    const usersResult = await User.find({ _id: userIds })

    // map assassins array to create duplicate array with names and profiles images
    const playersWithNamesAndImages = playerArr.map(player => {
        var updatedPlayer

        usersResult.forEach(user => {
            var imageURL = null
            if (user.profile_image.data) {
                imageURL = completeBase64ImageURL(user.profile_image.data)
            }

            if (user._id == player.user) {

                updatedPlayer = {
                    ...player._doc,
                    display_name: user.display_name,
                    profile_image: imageURL
                }
            }
        })

        return updatedPlayer
    })

    // console.log('new players array: ' + JSON.stringify(playersWithNamesAndImages))

    return playersWithNamesAndImages
}

async function getModeratorNamesAndImages(moderatorArr) {

    // get user objects for each moderator's user ID
    const usersResult = await User.find({ _id: moderatorArr })

    const moderatorsWithNamesAndImages = usersResult.map((user) => {
        const imageURL = completeBase64ImageURL(user.profile_image.data)
        const updatedModerator = {
            user: user._id,
            display_name: user.display_name,
            profile_image: imageURL
        }
        return updatedModerator
    })

    return moderatorsWithNamesAndImages
}

async function getRequestDisplayNames(requestsObj) {
    const assassinIds = requestsObj.assassins.map(request => {
        return request.user
    })
    const moderatorIds = requestsObj.moderators.map(request => {
        return request.user
    })

    const userIds = [...assassinIds, ...moderatorIds]

    const usersResult = await User.find({ _id: userIds })

    var updatedRequestObj = {
        assassins: [],
        moderators: []
    }

    usersResult.forEach((user) => {
        var modifiedRequest

        requestsObj.assassins.every(request => {


            if (user._id == request.user) {

                modifiedRequest = {
                    ...request._doc,
                    display_name: user.display_name,
                }

                return false
            } else { return true }
        })

        if (modifiedRequest) {

            updatedRequestObj.assassins.push(modifiedRequest)

        } else {

            requestsObj.moderator.every(request => {

                if (user._id === request.user) {
                    modifiedRequest = {
                        ...request._doc,
                        display_name: user.display_name,
                    }

                    updatedRequestObj.moderators.push(modifiedRequest)

                    return false

                } else { return true }
            })
        }
    })

    return updatedRequestObj

}