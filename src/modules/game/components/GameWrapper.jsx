import React, { useEffect, useState } from 'react'
import Layout from '../../../common/components/Layout'
import { GameContextProvider } from '../../../modules/game/contexts/GameContext'
import GamePopupManager from '../../../modules/game/components/GamePopupManager'
import GameComponent from '../../../modules/game/components/GameComponent'
import gameContexts from '../../../test-utils/mock-game-contexts'

export default function GameWrapper({ gameResult, user }) {

    // const [gameResult, setGameResult] = useState(game)

    // useEffect(() => {
    //     console.log('HELLO')
    //     setGameResult(game)
    // }, [game])


    console.log('GAME WRAPPER gameResult: ')
    console.log(gameResult)
    if (!gameResult) {
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
                            <GameComponent />
                        </Layout>
                    </GamePopupManager>
                </GameContextProvider>
            </>
        )
    }
}