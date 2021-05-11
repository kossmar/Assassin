import { screen, render, waitFor } from '@testing-library/react'
import router from 'next/router'

import Game from '../../../pages/games/[id]/index'

jest.mock('next/router', () => require('next-router-mock'));

test('game hook calls correctly and renders game page', async () => {

    router.push({
        route: '/api',
        pathname: '/games/[id]',
        query: { id: '123456' },
    });

    render(<Game />)

    const name = await screen.findByText(/NAME:/i)
    expect(name).toBeInTheDocument()
})


