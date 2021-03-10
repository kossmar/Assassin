import React, { useEffect, useState } from 'react'
import AssassinIcon from './AssassinIcon'
import { GAME_STATUS } from '../constants'

export default function Leaderboard({ assassins, forModerator = false }) {
    console.log(assassins)
    // useEffect(() => {
    //     // If moderator, sort assassins by target
    //     if (forModerator || status != GAME_STATUS.CREATED.STATUS) {
    //         const sortedAssassinsArr = findTargets(assassins[0], assassins, [])
    //         setAssassinList(sortedAssassinsArr)
    //     } else {
    //         setAssassinList(assassins)
    //     }

    // }, [assassins])
    useEffect(() => {
        setAssassinList(assassins)
    })

    const [assassinList, setAssassinList] = useState(assassins)
    const displayKills = false

    function findTargets(assassin, assassinsArr, sortedAssassinsArr) {
        if (assassinsArr.length <= 0) {
            return sortedAssassinsArr
        } else {
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

    return (
        <div>
            <div className='mt-8 grid grid-cols-3 w-5/6 mx-auto'>
                {/* {assassinList.sort((a, b) => {
                    return b.kills.length - a.kills.length
                }).map((assassin, index) => {
                    return (<AssassinIcon key={assassin.user} name={assassin.user} image={assassin.image} kills={assassin.kills} displayKills={displayKills} isWinning={(index===0 ? true : false)} />)
                })} */}
                {assassinList.map((assassin, index) => {
                    return (<AssassinIcon key={assassin.user} name={assassin.display_name} image={(assassin.profile_image ? assassin.profile_image : '/images/assassin.png')} kills={assassin.kills} displayKills={displayKills} isWinning={(index === 0 ? true : false)} />)
                })}
            </div>
        </div>
    )
}

const assassinsArr = [
    {
        name: "Fucknibz",
        image: "/images/bubz.jpeg",
        kills: "2"
    },
    {
        name: "Gundle Bunk",
        image: "/images/bubz.jpeg",
        kills: "0"
    },
    {
        name: "Pleetz",
        image: "/images/bubz.jpeg",
        kills: "0"
    },
    {
        name: "Crandle",
        image: "/images/bubz.jpeg",
        kills: "1"
    },
    {
        name: "Fucknibz the second",
        image: "/images/bubz.jpeg",
        kills: "2"
    },
    {
        name: "Tits the Ass",
        image: "/images/bubz.jpeg",
        kills: "0"
    },
]