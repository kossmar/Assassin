import useSWR from 'swr'
import axios from 'axios'
import { stringify } from 'postcss'


// const fetcher = (url) =>
//     fetch(url)
//         .then((res) => res.json())
//         .then((json) => json.data)


const fetcher = (url) => axios.get(url).then(res => res.data.data)


export function useGame(id) {

    // console.log('ID in useGame: ' + id)

    const { data: gameResult, error } = useSWR(id ? `/api/games/${id}` : null, fetcher)
    // console.log('DONGS: \n' + JSON.stringify(gameResult))
    // console.log(gameResult)
    return { gameResult, error }

}