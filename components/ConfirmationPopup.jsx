import React from 'react'

export default function ConfirmationPopup({ isOpen, confirmCallback, cancelCallback, message }) {

    function handleCancelClick() {
        cancelCallback()
    }

    function handleConfirmClick() {
        confirmCallback()
    }

    return (
        <div className={(isOpen ? "fixed" : "hidden") + " bg-gray-200 bg-opacity-70 w-full h-full"}>
            <div className="flex h-full w-full">
                <div className="flex p-2 mx-auto place-self-center bg-white border-2 border-gray-400 rounded-lg w-96 h-60">
                    <div className=" mx-auto place-self-center bg-gray-200 space-y-4">
                        <div className="text-center">
                            {message}
                        </div>
                        <div className="grid grid-cols-2">
                            <div onClick={handleConfirmClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-red-400 bg-red-400 hover:bg-red-300 hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    YES
                                </div>
                            </div>
                            <div onClick={handleCancelClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:bg-blue-300 hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    CANCEL
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}