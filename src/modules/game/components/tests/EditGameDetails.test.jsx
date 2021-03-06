import { render, screen } from '@testing-library/react'
import mockGameContexts from '../../../../test-utils/mock-game-contexts'
import EditGameDetails from '../EditGameDetails'

const gameDetails = {
    game_name: '',
    weapons: '',
    safe_zones: ''
}

const game = mockGameContexts.default_game_context_status_CREATED.game 

test('inputs display properly on render', () => {

    render(<EditGameDetails onChange={jest.fn()} details={gameDetails} />)

    const name = screen.getByRole('textbox', { name: /game name/i })
    const weapons = screen.getByRole('textbox', { name: /weapons/i })
    const safeZones = screen.getByRole('textbox', { name: /safe zones/i })

    expect(name).toHaveTextContent('')
    expect(weapons).toHaveTextContent('')
    expect(safeZones).toHaveTextContent('')
})
