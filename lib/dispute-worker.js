import { mutate } from "swr"

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export async function getCurrentDispute(disputeId) {

    return new Promise(async (resolve) => {
        try {
            const params = new URLSearchParams({ disputes: [disputeId] })
            const paramStr = params.toString()
            const res = await fetch(`/api/disputes?${paramStr}`, {
                method: 'GET',
                headers: jsonHeaders,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()
            resolve(data)
        } catch (error) {
            console.log("Failed to get current Dispute - game-worker.js: " + error)
        }
    })

}

export async function submitDisputeResponse(responseStr, disputeId) {

    return new Promise(async (resolve) => {

        const body = JSON.stringify({
            response: responseStr,
            disputeId: disputeId
        })

        try {

            const res = await fetch('/api/disputes/response', {
                method: 'PUT',
                headers: jsonHeaders,
                body: body,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data, success } = await res.json()
            // mutate(`/api/disputes/${disputeId}`, data, false)
            resolve(success)

        } catch (error) {
            console.log("Failed to get current Dispute - game-worker.js: " + error)
            resolve(false)
        }
    })

}