import { render } from '@testing-library/react'
import { GameContextProvider, GameContext } from '../modules/game/contexts/GameContext'

// const renderWithContext = (ui, options) =>
//     render(ui, { wrapper: GameContextProvider, ...options })


// const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
//     return render(
//         <GameContext.Provider {...providerProps}>
//             {ui}
//         </GameContext.Provider>,
//         renderOptions
//     )
// }



const renderWithContext = (ui, { injectedGameContext, ...renderOptions } = {}) => {
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

export { renderWithContext as render }