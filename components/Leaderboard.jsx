import React, { useEffect, useState } from 'react'
import AssassinIcon from './AssassinIcon'
import { GAME_STATUS } from '../constants'


export default function Leaderboard({ assassins, forModerator, status, graveyard }) {


    // FIXME: Remove arrows for GRAVEYARD
    // FIXME: Shrink arrows on smaller screens or just plop them behind the assassin icons on the z-index

    //STATE
    const [assassinList, setAssassinList] = useState(null)
    const displayKills = false


    // USE EFFECT
    useEffect(() => {
        if (forModerator && status != GAME_STATUS.CREATED.STATUS && !graveyard) {
            const assassinsDuplicate = [...assassins]
            // recursively sort assassins
            const sortedAssassinsArr = findTargets(assassins[0], assassinsDuplicate, [])
            if (sortedAssassinsArr) setAssassinList(sortedAssassinsArr)
        } else {
            if (assassins) setAssassinList(assassins)
        }
    }, [assassins])

    // FUNCTIONS
    function findTargets(assassin, assassinsArr, sortedAssassinsArr) {
        if (assassinsArr.length === 1) {
            // on last assassin, push to end of sortedAssassinsArr
            const updatedSortedAssassinsArr = [...sortedAssassinsArr, assassinsArr[0]]
            return updatedSortedAssassinsArr
        } else {
            // loop through assassins, find assassin with user id that matches previous assassin's target
            for (var i = 0; i < assassinsArr.length; i++) {

                const target = assassinsArr[i]

                if (target.user === assassin.target) {
                    assassinsArr.splice(i, 1)
                    const updatedSortedAssassinsArr = [...sortedAssassinsArr, target]
                    return findTargets(target, assassinsArr, updatedSortedAssassinsArr)

                }
            }
        }
    }

    // HTML 
    return (
        <div>
            <div className={'mt-8 grid w-5/6 mx-auto grid-cols-3'}>
                {/* {assassinList.sort((a, b) => {
                    return b.kills.length - a.kills.length
                }).map((assassin, index) => {
                    return (<AssassinIcon key={assassin.user} name={assassin.user} image={assassin.image} kills={assassin.kills} displayKills={displayKills} isWinning={(index===0 ? true : false)} />)
                })} */}
                {(assassinList
                    ?
                    assassinList.map((assassin, index) => {
                        return (
                            <div key={assassin.user} className='grid grid-cols-2'>
                                <AssassinIcon key={index} name={assassin.display_name} image={(assassin.profile_image ? assassin.profile_image : '/images/assassin.png')} kills={assassin.kills} displayKills={displayKills} isWinning={(index === 0 ? true : false)} />
                                {((forModerator && status != GAME_STATUS.CREATED.STATUS && !graveyard) &&
                                    <img src='/images/arrow.png' className='ml-4 place-self-center' />
                                )}
                            </div>
                        )
                    })

                    :
                    <div className='text-center col-span-3'>
                        LOADING...
                    </div>
                )}

            </div>
        </div>
    )
}

Leaderboard.defaultProps = {
    graveyard: false,
    forModerator: false
}
