import { render } from '@testing-library/react'
import { GameContextProvider, GameContext } from '../modules/game/contexts/GameContext'
import mockGameContexts from './mock-game-contexts'

// const renderWithContext = (ui, options) =>
//     render(ui, { wrapper: GameContextProvider, ...options })
const defaultGame = mockGameContexts.default_game_context_status_CREATED.game
const defaultUser = {
    email: 'default',
    display_name: 'default',
    profile_image: null,
    games: {
        current: ['default'],
        previous: ['default']
    }
}

const defaultState = {
    game: defaultGame,
    user: defaultUser,
    injectedUserState: {}
}

const renderWithContext = (ui, { game, user, injectedUserState, options } = {}) => {

    const gameResult = {
        ...defaultGame,
        ...game,
    }
    const userObj = {
        ...defaultUser,
        ...user,
    }


    return render(
        <GameContextProvider gameResult={gameResult} user={userObj} injectedUserState={injectedUserState}>
            {ui}
        </GameContextProvider>
        ,
        { ...options }
    )
}



// const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
//     return render(
//         <GameContext.Provider {...providerProps}>
//             {ui}
//         </GameContext.Provider>,
//         renderOptions
//     )
// }



const renderWithMockContext = (ui, { injectedGameContext, ...renderOptions } = {}) => {
    const value = [
        {
            ...injectedGameContext
        }
    ]
    return render(
        <GameContext.Provider value={value}>
            {ui}
        </GameContext.Provider>,
        renderOptions
    )
}

export * from '@testing-library/react'

export { renderWithContext as render, renderWithMockContext }