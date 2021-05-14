import React from 'react'

export default function BinaryPopup({ isOpen, firstOptionTitle, firstCallback, secondOptionTitle, secondCallback, message, isWarningStyle = false }) {

    function handleSecondOptionClick() {
        secondCallback()
    }

    function handleFirstOptionClick() {
        firstCallback()
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
                            <div onClick={handleFirstOptionClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto " + (isWarningStyle ? "border-red-400 bg-red-400 hover:bg-red-300" : "border-blue-400 bg-blue-400 hover:bg-blue-300") + " hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    {firstOptionTitle}
                                </div>
                            </div>
                            <div onClick={handleSecondOptionClick} className={"my-2 cursor-pointer flex place-content-center w-36 h-10 rounded-md mx-auto border-blue-400 bg-blue-400 hover:bg-blue-300 hover:border-2 text-white"}>
                                <div className="place-self-center">
                                    {secondOptionTitle}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}