import React from 'react'
import { mutate } from 'swr'

export default function JoinRequest({ name, userId, gameId, role }) {


    const jsonHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    
    async function handleApproveClick() {
        console.log("freak one for me")
        const body = {
            gameId: gameId,
            userId: userId,
            role: role
        }

        try {
            const res = await fetch(`/api/games/approve-request`, {
                method: 'PUT',
                headers: jsonHeaders,
                body: JSON.stringify(body)
            })
    
            if (!res.ok) {
                throw new Error(res.status)
            }
    
            const { data } = await res.json()
            mutate(`/api/games/${gameId}`, data, false)

    
    
        } catch (error) {
            console.log("Failed to update game: " + error)
        }
    }

    function handleDenyClick() {

    }

    return (
        <div className="my-6 bg-gray-200 border rounded-lg border-gray-400">

            <div className="grid grid-cols-5 m-2 bg-blue-50 rounded-lg">
                <div className="col-span-3">
                    {name}
                </div>
                <div>
                    <button onClick={handleApproveClick} className="rounded w-5/6 bg-green-300 hover:bg-green-400 hover:text-white">
                        Yes
                    </button>
                </div>
                <div>
                    <button onClick={handleDenyClick} className="rounded w-5/6 bg-red-300 hover:bg-red-500 hover:text-white">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}