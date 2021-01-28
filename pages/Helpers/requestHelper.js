import useSWR, { mutate } from 'swr'


const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

export function useGetGame(id) {

    const { data: game, error } = useSWR(id ? `/api/games/${id}` : null, fetcher)

    return { game, error }
}

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

