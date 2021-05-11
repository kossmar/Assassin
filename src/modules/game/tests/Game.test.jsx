import { screen, render, waitFor } from '@testing-library/react'
import router, { useRouter } from 'next/router'
import gameContexts from '../../../test-utils/mock-game-contexts'

import Game from '../../../pages/games/[id]/index'

const game = gameContexts.default_game_context_status_CREATED.game

jest.mock('next/router', () => require('next-router-mock'));

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     // json: () => Promise.resolve({ game }),
//   })
// );

test('game hook calls correctly', async () => {

    router.push({
        route: '/api',
        pathname: '/games/[id]',
        query: { id: '123456' },
    });

    render(<Game />)

    const name = await screen.findByText(/NAME:/i)
    expect(name).toBeInTheDocument()
})


