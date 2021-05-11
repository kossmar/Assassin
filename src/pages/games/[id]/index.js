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

    const { gameResult, error } = useGame(id)
    console.log('gameResult return from useGame in index: ')
    console.log(gameResult)

    if (error) {
        console.log('ERROR: ' + error)
        return <p>Failed to load!</p>
    } else {
        return <GameWrapper gameResult={gameResult} user={user} />
    }
}

export default Game

