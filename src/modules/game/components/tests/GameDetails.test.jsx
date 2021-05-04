import React from 'react'
import { screen, render } from '../../../../test-utils/render-with-game-context'

import GameDetails from '../GameDetails'
import mockGameContexts from '../../../../test-utils/mock-game-contexts'


test('details display properly on render', () => {
    const injectedGameContext = mockGameContexts.default_game_context_status_CREATED
    render(<GameDetails />, { injectedGameContext })

    const name = screen.getByRole('heading', { name: 'NAME' })
    const weapons = screen.getByRole('heading', { name: 'WEAPONS' })
    const safeZones = screen.getByRole('heading', { name: 'SAFE ZONES' })
    expect(name)
    
})