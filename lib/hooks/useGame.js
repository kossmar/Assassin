import useSWR from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

export function useGame(id) {

    const { data: game, error } = useSWR(id ? `/api/games/${id}` : null, fetcher)

    return { game, error }
}