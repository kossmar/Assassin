import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import MyApp from '../../../../pages/_app'
import NewGame from '../NewGame'


test('textboxes function properly on text input', () => {
    render(<NewGame />)

    // get text inputs
    const name = screen.getByRole('textbox', { name: /game name/i })
    const weapons = screen.getByRole('textbox', { name: /weapons/i })
    const safeZones = screen.getByRole('textbox', { name: /safe zones/i })

    // clear them all and enter new text
    userEvent.clear(name)
    userEvent.type(name, 'name')

    userEvent.clear(weapons)
    userEvent.type(weapons, 'weapons')

    userEvent.clear(safeZones)
    userEvent.type(safeZones, 'safe zones')

    // check for correct text
    expect(name).toHaveTextContent(/^name$/)
    expect(weapons).toHaveTextContent(/^weapons$/)
    expect(safeZones).toHaveTextContent(/^safe zones$/)
})

test('userIcon turns red when role is selected', () => {
    render(<NewGame />)

    const clickBorder = 'border-red-600'

    // get userIcons is ROLE state
    const assassinButton = screen.getByTitle(/assassin/i)
    const moderatorButton = screen.getByTitle(/moderator/i)

    // click assassin role and check if it gets a red border while moderator remains without
    userEvent.click(assassinButton)
    expect(assassinButton).toHaveClass(clickBorder)
    expect(moderatorButton).not.toHaveClass(clickBorder)

    // click moderator role and check if it gets a red border while assassin remains without
    userEvent.click(moderatorButton)
    expect(moderatorButton).toHaveClass(clickBorder)
    expect(assassinButton).not.toHaveClass(clickBorder)

})

describe('when save button is pressed', () => {
    beforeEach(() => {
        render(<NewGame />)
    })

    test('alert displays when input is left empty', () => {

        // expect document to have no error messages
        expect(screen.queryAllByRole('listitem')).toHaveLength(0)

        // find save button
        const saveButton = screen.getByRole('button', { name: /save/i })

        // find and clear inputs
        const name = screen.getByRole('textbox', { name: /game name/i })
        const weapons = screen.getByRole('textbox', { name: /weapons/i })
        const safeZones = screen.getByRole('textbox', { name: /safe zones/i })
        userEvent.clear(name)
        userEvent.clear(weapons)
        userEvent.clear(safeZones)

        userEvent.type(weapons, '0')
        userEvent.type(safeZones, '0')
        userEvent.click(saveButton)

        // expect 2 error messages when only 1 input is left blank and role is not selected
        const errorArray = screen.queryAllByRole('listitem')
        expect(errorArray).toHaveLength(2)
    })

    // test('pressing save returns a new game object with a mongo id', () => {
        //TODO: not sure how to meaningfully test the save button being pressed
        // could either try and test to see that a game is returned through a spy
        // but in terms of e2e might make more sense to try and test that navigation to game page occurs
        // not sure how to do that.... 
        // maybe by rendering <App /> and then testing that either elements from newGame disappear or that elements from GameComponent appear
        // but that would require more mock calls to be written, I think. to avoid this error: 
        // [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "ReferenceError: user is not defined".] {
        //     code: 'ERR_UNHANDLED_REJECTION'
        //   }

        // router.push({
        //     route: '/api',
        //     pathname: '/games/new',
        // });

        // render(<MyApp />)
        // const saveButton = screen.getByRole('button', { name: /save/i })

        // // find and clear inputs
        // const name = screen.getByRole('textbox', { name: /game name/i })
        // const weapons = screen.getByRole('textbox', { name: /weapons/i })
        // const safeZones = screen.getByRole('textbox', { name: /safe zones/i })
        // const assassinButton = screen.getByTitle(/assassin/i)
        // userEvent.clear(name)
        // userEvent.clear(weapons)
        // userEvent.clear(safeZones)
        // userEvent.click(assassinButton)

        // userEvent.type(name, '0')
        // userEvent.type(weapons, '0')
        // userEvent.type(safeZones, '0')
        // userEvent.click(saveButton)

        // const name2 = screen.queryByRole('textbox', { name: /game name/i })
        // expect(name2).not.toBeInTheDocument()

    // })
})
