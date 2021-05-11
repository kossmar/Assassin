import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGame } from '../../../modules/game/hooks/useGame'
import { useUser } from '../../../modules/auth/hooks/useUser'
import GameWrapper from '../../../modules/game/components/GameWrapper'
import axios from 'axios'

const Game = (props) => {

    // TODO: OKAY so I figured out how to user mock service worker in Next.js. Now I need to figure out how to use it with useSWR 

    // const user = useUser({ redirectIfUnauthorized: '/login' })
    const user = useUser()

    const router = useRouter()
    const { id } = router.query

    // - - - - - - - - - - - - -

    // TEST CODE: this is only to make sure that I am properly mocking axios calls. proper code is below in the commented out Dong function
    // console.log('pork')
    // console.log(id)
    // const [gameResult, setGameResult] = useState(null)

    // useEffect(() => {
    // axios.get(`/api/games/${id}`).then(res => {
    //     console.log('DONGLES')
    //     console.log(res.data.data)
    //     setGameResult(res.data.data)
    // })
    // }, [])

    // if (gameResult != null) {
    //     return <GameWrapper gameResult={gameResult} user={user} />
    // } else {
    //     return <p>Failed to load!</p>
    // }

    // - - - - - - - - - - - - - - 

    // REAL CODE

    const { gameResult, error } = useGame(id)
    console.log('gameResult return from useGame in index: \n' + JSON.stringify(gameResult))

    if (error) {
        console.log('ERROR: ' + error)
        return <p>Failed to load!</p>
    } else {
        return <GameWrapper gameResult={gameResult} user={user} />
    }
}

export default Game

// export async function getServerSideProps({ query }) {



//     console.log(query.id)
//     const thing = await fetcher(`/api/games/${query.id}`)
//     console.log('FUCK')
//     console.log(thing)

//     return {
//         props: {
//             thing: null
//         }
//     }

// }


// const fetcher = (url) => axios.get(url).then(res => res.data.data)

