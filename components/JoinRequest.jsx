import React from 'react'

export default function JoinRequest({ name, userId }) {
    return (
        <div className="my-6 bg-gray-200 border rounded-lg border-gray-400">

            <div className="grid grid-cols-5 m-2 bg-blue-50">
                <div className="col-span-3">
                    {name}
                </div>
                <div>
                    <button onClick={(() => { })} className="rounded w-5/6 bg-green-300 hover:bg-green-400 hover:text-white">
                        Yes
                    </button>
                </div>
                <div>
                    <button onClick={(() => { })} className="rounded w-5/6 bg-red-300 hover:bg-red-500 hover:text-white">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}