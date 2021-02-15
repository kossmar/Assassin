import useSWR from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

export function useGame(id) {

    const { data: gameResult, error } = useSWR(id ? `/api/games/${id}` : null, fetcher)

    return { gameResult, error }
}