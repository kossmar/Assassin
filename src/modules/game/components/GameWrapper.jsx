import React from 'react'
import Layout from '../../../common/components/Layout'
import { GameContextProvider } from '../../../modules/game/contexts/GameContext'
import GamePopupManager from '../../../modules/game/components/GamePopupManager'
import GameComponent from '../../../modules/game/components/GameComponent'
import gameContexts from '../../../test-utils/mock-game-contexts'

export default function GameWrapper({ gameResult, user }) {

    // const mockUser = {
    //     _id: 123456,
    //     email: 'default',
    //     display_name: 'default',
    //     profile_image: null,
    //     games: null

    // }
    // const game = gameResult ? gameResult : gameContexts.default_game_context_status_CREATED.game
    // const userThing = user ? user : mockUser


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