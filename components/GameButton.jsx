import React from 'react'
import Link from 'next/link'

export default function GameButton({ name, id, isComplete }) {

    const gamePath = `/games/${id}`

    return (
        // TODO: make the text wrap on long names
        <Link href={gamePath}>
            <div className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto " + (!isComplete ? "border-green-400 bg-green-400 hover:bg-green-300" : "border-red-400 bg-red-400 hover:bg-red-300") + " hover:border-2 text-white"}>
                <button>
                    {name}
                </button>
            </div>
        </Link>
    )

}