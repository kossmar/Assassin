import { rest } from 'msw'
import gameContexts from '../test-utils/mock-game-contexts'

const defaultGame = gameContexts.default_game_context_status_CREATED.game
const defaultUser = {
    _id: 123456,
    email: 'default',
    display_name: 'default',
    profile_image: null,
    games: null

}
export const handlers = [
    // New Game
    rest.get('/api/games/new', (req, res, ctx) => {
        const { game, userId } = req.body
        return res(
            ctx.json(game)
        )
    }),

    rest.get('/api/games/:id', (req, res, ctx) => {
        return res(
            ctx.json({ data: defaultGame })
        )
    }),
]