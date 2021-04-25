import React, { useState, useEffect } from 'react'
import GameComponent from '../../../modules/game/components/GameComponent'
import Layout from "../../../common/components/Layout"
import { useRouter } from 'next/router'
import { useGame } from '../../../modules/game/hooks/useGame'
import { useUser } from '../../../modules/auth/hooks/useUser'
import { GameContextProvider } from '../../../modules/game/contexts/GameContext'
import GamePopupManager from '../../../modules/game/components/GamePopupManager'

const ThisGame = () => {

    const user = useUser({ redirectIfUnauthorized: '/login' })

    const router = useRouter()
    const { id } = router.query

    const { gameResult, error } = useGame(id)

    if (error) return <p>Failed to load</p>
    if (!gameResult || !user) {
        return (
            <>
                <Layout>
                    <div className='flex place-content-center text-center mx-auto w-1/3'>
                        <p>Loading...</p>
                    </div>
                </Layout>
            </>
        )
    } else {
        return (
            <>
                <GameContextProvider gameResult={gameResult} user={user}>
                    <GamePopupManager user={user}>
                        <Layout>
                            <GameComponent key={gameResult._id} gameResult={gameResult} user={user} />
                        </Layout>
                    </GamePopupManager>
                </GameContextProvider>
            </>
        )
    }
}

export default ThisGame