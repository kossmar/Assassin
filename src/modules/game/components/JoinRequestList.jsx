import React from 'react'
import { useGameContext } from '../contexts/GameContext'

export default function JoinRequestList() {

    const [gameContext] = useGameContext()
    const { game, userState } = gameContext

    if (userState.isModerator) {
        return (
            <>
                <div className='w-2/6 mx-auto text-center font-bold underline text-2xl'>
                    Requests:
                </div>
                <div className='border-blue-100 border-2 bg-gray-100 rounded-xl p-4'>
                    <div>
                        <div className='w-2/6 mx-auto text-center font-bold'>
                            Assassins
                        </div>
                        <div className={'font-bold text-gray-400 ' + (game.join_requests.assassins.length === 0 ? '' : 'hidden')}>
                            NONE
                        </div>
                        {game.join_requests.assassins.map((request) => (
                            <JoinRequest key={request.user} role={ROLE.ASSASSIN} name={request.display_name} gameId={game._id} userId={request.user} />
                        ))}
                    </div>
                    <div>
                        <div className='mt-4 w-2/6 mx-auto text-center font-bold'>
                            Moderators
                        </div>
                        <div className={'font-bold text-gray-400 ' + (game.join_requests.moderators.length === 0 ? '' : 'hidden')}>
                            NONE
                        </div>
                        {game.join_requests.moderators.map(request => (
                            (request.role === ROLE.MODERATOR &&
                                <JoinRequest key={request.user} role={ROLE.MODERATOR} name={request.display_name ? request.display_name : "loading"} gameId={game._id} userId={request.user} />
                            )
                        ))}
                    </div>
                </div>
            </>
        )
    } else return null
}