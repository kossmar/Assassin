import useSWR, { mutate } from 'swr'
import Router from 'next/router'
import { completeBase64ImageURL } from './encoder'

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export async function startGame(game) {
    try {

        const body = JSON.stringify({
            game: game
        })

        const res = await fetch('/api/games/start', {
            method: 'PUT',
            headers: jsonHeaders,
            body: body
        })

        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()
        mutate(`/api/games/${game._id}`, data, false)

    } catch (error) {
        console.log("Failed to start game: " + error)
    }
}

export async function saveGame(updatedGame) {

    try {
        const res = await fetch(`/api/games/${updatedGame._id}`, {
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(updatedGame),
        })

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()
        mutate(`/api/games/${updatedGame._id}`, data, false)


    } catch (error) {
        console.log("Failed to update game: " + error)
        // setMessage('Failed to update game')
    }
}

export async function deleteGame(gameId) {

    try {
        const res = await fetch(`/api/games/${gameId}`, {
            method: 'DELETE',
            headers: jsonHeaders
        })

        if (!res.ok) {
            throw new Error(res.status)
        }

        if (res.status === 200) {
            Router.push("/")
        }

    } catch (error) {
        console.log("Failed to delete game: " + error)
    }

}

export async function getUsers(assassinIds) {
    return new Promise(async (resolve) => {
        try {
            const params = new URLSearchParams({ users: assassinIds })
            const paramStr = params.toString()
            console.log('PARAM STR:')
            console.log(paramStr)
            const res = await fetch(`/api/users?${paramStr}`, {
                method: 'GET',
                headers: jsonHeaders,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()
            resolve(data)

        } catch (error) {
            console.log("Failed to get users: " + error)
        }
    })
}

export async function getAssassinNamesAndImages(assassinsArr) {

    return new Promise(async (resolve) => {
        const assassinIds = assassinsArr.map(a => {
            return a.user
        })

        getUsers(assassinIds).then(foundUsers => {

            const assassinsWithNames = assassinsArr.map(assassin => {
                var assassin

                foundUsers.forEach(user => {
                    var imageURL = null
                    if (user.profile_image.data) {
                        imageURL = completeBase64ImageURL(user.profile_image.data)
                    }

                    if (user._id == assassin.user) {
                        assassin = {
                            ...assassin,
                            display_name: user.display_name,
                            profile_image: imageURL
                        }
                    }
                })

                return assassin
            })

            resolve(assassinsWithNames)
        })
    })
}

export async function getGraveyardNamesAndImages(graveyardArr) {

    return new Promise(async (resolve) => {
        const graveyardIds = graveyardArr.map(g => {
            return g.user
        })

        getUsers(graveyardIds).then(foundUsers => {

            const graveyardWithNamesAndImages = graveyardArr.map(deadGuy => {
                var deadGuy

                foundUsers.forEach(user => {

                    if (user._id == deadGuy.user) {

                        var imageURL = null
                        if (user.profile_image.data) {
                            imageURL = completeBase64ImageURL(user.profile_image.data)
                        }

                        deadGuy = {
                            ...deadGuy,
                            display_name: user.display_name,
                            profile_image: imageURL
                        }
                    }
                })

                return deadGuy
            })

            resolve(graveyardWithNamesAndImages)
        })
    })
}

export async function getModeratorNamesAndImages(moderators) {
    return new Promise(async (resolve) => {

        const moderatorIds = moderators.map((moderator) => {
            var id = (moderator.hasOwnProperty('display_name') ? moderator._id : moderator)
            return id
        })

        getUsers(moderatorIds).then(foundUsers => {

            const modifiedModerators = foundUsers.map((user) => {
                const imageURL = completeBase64ImageURL(user.profile_image.data)
                const modifiedModerator = {
                    _id: user._id,
                    display_name: user.display_name,
                    profile_image: imageURL
                }
                return modifiedModerator
            })


            resolve(modifiedModerators)
        })
    })

}

export async function getRequestDisplayNames(requests) {

    return new Promise(async (resolve) => {


        const assassinIds = requests.assassins.map(request => {
            return request.user
        })
        const moderatorIds = requests.moderators.map(request => {
            return request.user
        })

        const userIds = [...assassinIds, ...moderatorIds]
        getUsers(userIds).then(foundUsers => {

            var modifiedRequestObject = {
                assassins: [],
                moderators: []
            }

            foundUsers.forEach((foundUser) => {
                var modifiedRequest
                requests.assassins.every(request => {
                    if (foundUser._id === request.user) {
                        modifiedRequest = {
                            ...request,
                            display_name: foundUser.display_name,
                        }
                        return false
                    } else { return true }
                })
                if (modifiedRequest) {
                    modifiedRequestObject.assassins.push(modifiedRequest)
                } else {
                    requests.moderator.every(request => {
                        if (foundUser._id === request.user) {
                            modifiedRequest = {
                                ...request,
                                display_name: foundUser.display_name,
                            }
                            modifiedRequestObject.moderators.push(modifiedRequest)
                            return false
                        } else { return true }
                    })
                }
            })

            resolve(modifiedRequestObject)
        })

    })

}

export async function sendJoinRequest(gameId, userId, role, callback) {

    const body = JSON.stringify({
        gameId: gameId,
        userId: userId,
        role: role
    })

    try {
        const res = await fetch('/api/games/join', {
            method: "PUT",
            headers: jsonHeaders,
            body: body
        })

        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()
        mutate(`/api/games/${gameId}`, data, false)

        callback()

    } catch (error) {
        console.log("Failed to request to join game: " + error)
    }
}

export async function leaveGame(gameId, userId, callback) {
    const body = JSON.stringify({
        gameId: gameId,
        userId: userId
    })

    try {
        const res = await fetch('/api/games/leave', {
            method: "PUT",
            headers: jsonHeaders,
            body: body
        })

        if (!res.ok) {
            throw new Error(res.status)
        }

        const { data } = await res.json()
        mutate(`/api/games/${gameId}`, data, false)

        callback()

    } catch (error) {
        console.log("Failed to leave game: " + error)
    }
}


