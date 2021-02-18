import useSWR, { mutate } from 'swr'
import Router from 'next/router'

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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

export async function getAssassinNames(assassinsArr) {
    return new Promise(async (resolve) => {
        const assassinIds = assassinsArr.map(a => {
            return a.user
        })

        getUsers(assassinIds).then(foundUsers => {

            const assassinsWithNames = assassinsArr.map(assassin => {
                var assassin
                foundUsers.forEach(user => {
                    if (user._id == assassin.user) {
                        assassin = {
                            ...assassin,
                            display_name: user.display_name
                        }
                    }
                })
                return assassin
            })

            resolve(assassinsWithNames)
        })
    })
}

export async function getModeratorName(moderator) {
    return new Promise(async (resolve) => {
        var id = (moderator.hasOwnProperty('display_name') ? moderator._id : moderator)

        getUsers(id).then(data => {

            const modifiedModerator = {
                _id: id,
                display_name: data[0].display_name
            }

            resolve(modifiedModerator)
        })
    })

}

