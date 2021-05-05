import React from 'react'
import { screen, render } from '../../../../test-utils/render-with-game-context'
import userEvent from '@testing-library/user-event'

import GameDetails from '../GameDetails'

test('details display properly on render when not editing', () => {
    render(<GameDetails />)

    const name = screen.getByRole('heading', { name: /NAME:/i })
    const weapons = screen.getByRole('heading', { name: /WEAPONS:/i })
    const safeZones = screen.getByRole('heading', { name: /SAFE ZONES:/i })

    screen.debug()
    expect(name).toHaveTextContent('default')
    expect(weapons).toHaveTextContent('default')
    expect(safeZones).toHaveTextContent('default')
})

test('textboxes function properly on text input while editing', () => {

    const injectedUserState = { isEditing: true }
    render(<GameDetails />, { injectedUserState })

    const name = screen.getByRole('textbox', { name: /game name/i })
    const weapons = screen.getByRole('textbox', { name: /weapons/i })
    const safeZones = screen.getByRole('textbox', { name: /safe zones/i })

    userEvent.clear(name)
    userEvent.type(name, 'name')

    userEvent.clear(weapons)
    userEvent.type(weapons, 'weapons')

    userEvent.clear(safeZones)
    userEvent.type(safeZones, 'safe zones')

    expect(name).toHaveTextContent(/^name$/)
    expect(weapons).toHaveTextContent(/^weapons$/)
    expect(safeZones).toHaveTextContent(/^safe zones$/)

})