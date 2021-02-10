import React from 'react'
import Link from 'next/link'

export default function GameButton({ name, gameId }) {

    const gamePath = `/games/${gameId}`

    return (
        <Link href={gamePath}>
            <div className="cursor-pointer flex place-content-center w-36 h-16 rounded-md mx-auto border-green-400 bg-green-400 hover:border-2 hover:bg-green-300 text-white">
                <button>
                    {name}
                </button>
            </div>
        </Link>
    )

}