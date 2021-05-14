
/* The POST method adds a new entry in the mongodb database. */

const contentType = 'application/json'

export async function postNewGame(newGame, userId) {

    return new Promise(async (resolve, reject) => {

        const body = { game: newGame, userId: userId }

        try {
            const res = await fetch('/api/games/new', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(body),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const data = await res.json()
            const id = data.data._id
            resolve(id)

        } catch (error) {
            setMessage('Failed to add game: \n' + errors)
            console.log('Failed to add game \n' + error)
            reject(new Error('Failed to add game'))
        }
    })

}

export async function postNewGameToCurrent(userId, gameId) {

    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify({ userId: userId, gameId: gameId })

        try {
            const res = await fetch("/api/profile/add-new-game", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            if (!res.ok) {
                console.log('THA FUCK')
                throw new Error(res.status)
            }

            resolve()

        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

// TODO: delete in production
export function addNewGameToHardCodedAsassins(gameId) {
    return new Promise((resolve, reject) => {
        Promise.all([
            postNewGameToCurrent(usersArr[0], gameId),
            postNewGameToCurrent(usersArr[1], gameId),
            postNewGameToCurrent(usersArr[2], gameId),
            postNewGameToCurrent(usersArr[3], gameId),
        ])
            .then(resolve(gameId))
            .catch((error) => reject('Failed to update all hard coded users: ' + error))
    })

}

export function formValidate(gameDetails, selectedRole) {
    let err = {}
    if (!gameDetails.game_name) err.game_name = 'Game Name is required'
    if (!gameDetails.weapons) err.weapons = 'Weapons are required'
    if (!gameDetails.safe_zones) err.safe_zones = 'Safe Zones are required'
    if (!selectedRole) err.role = 'You must select a role for yourself'
    return err
}

// TODO: Delete this biz at some point

const usersArr = [
    '602b00ec1d66220c2a813b8a',
    '602b010e1d66220c2a813b8b',
    '602b01361d66220c2a813b8c',
    '6025b3144fdfe637afe77bbe',
]

export function createAssassins() {
    return usersArr.map(userId => {
        return {
            user: userId,
            target: '',
            is_waiting: false,
            kills: [],
            status: "ALIVE",
            dispute: '',
            rank_index: 0,
        }
    })
}