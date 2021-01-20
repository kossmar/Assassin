import React, { useEffect, useState } from 'react'
import AssassinIcon from './AssassinIcon'

export default function Leaderboard({ props }) {

    const [assassinList, setAssassinList] = useState(assassinsArr)
    const displayKills = true

    return (
        <div>
            <div className='mt-8 grid grid-cols-5 w-4/6 mx-auto'>
                {assassinList.sort((a, b) => {
                    return b.kills - a.kills
                }).map((assassin, index) => {
                    return (<AssassinIcon key={assassin.name} name={assassin.name} image={assassin.image} kills={assassin.kills} displayKills={displayKills} isWinning={(index===0 ? true : false)} />)
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