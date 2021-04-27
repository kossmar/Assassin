import React from 'react'

export default function GameButton({ disabled = false, onClick, borderColor, color, text }) {

    if (!disabled) {
        return (
            <>
                <button
                    className={`flex w-44 justify-center mx-auto px-10 py-2 rounded-md border-2 hover:border-black text-white font-bold ${color} ${borderColor}`}
                    onClick={onClick}
                >
                    {text}
                </button>
            </>
        )
    } else return null
}