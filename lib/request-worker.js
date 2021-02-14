import useSWR, { mutate } from 'swr'

export async function saveGame(updatedGame) {

    try {
        const res = await fetch(`/api/games/${updatedGame._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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

export async function getUsers(assassinIds) {
    console.log("ass ids: " + JSON.stringify(assassinIds))
    return new Promise(async (resolve) => {
        try {
            console.log(assassinIds)
            const params = new URLSearchParams({users: assassinIds})
            const paramStr = params.toString()
            console.log(paramStr)
            const res = await fetch(`/api/users?${paramStr}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()
            console.log("DATSSSS: " + data)
            resolve(data)

        } catch (error) {
            console.log(error)
        }
    })

}

