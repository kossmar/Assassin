import { mutate } from "swr"

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}


// TODO: Collapse this functionality into getDisputes and modify DisputPopUp.jsx accordingly
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

export async function getDisputes(disputes) {

    return new Promise(async (resolve) => {
        try {
            const params = new URLSearchParams({ disputes: disputes })
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

export async function targetCancelDispute(dispute) {
    return new Promise(async (resolve) => {

        const body = JSON.stringify({
            dispute: dispute,
        })

        try {

            const res = await fetch('/api/disputes/cancel-dispute-target', {
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
            console.log("Failed to cancel dispute (target) - game-worker.js: " + error)
            resolve(false)
        }
    })
}

export async function killTarget(dispute) {
    
    return new Promise(async (resolve) => {

        const body = JSON.stringify({
            dispute: dispute
        })

        try {
            const res = await fetch('/api/disputes/kill-target', {
                method: 'PUT',
                headers: jsonHeaders,
                body: body,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data, success } = await res.json()
            mutate(`/api/games/${data._id}`, data, false)
            resolve(success)

        } catch (error) {
            console.log('Could not kill target - killTarget: ' + error)
            resolve(false)
        }
    })

}

export async function saveTarget(dispute) {

    console.log('saveTarget DISPUTE passed: ')
    console.log(dispute)

    return new Promise(async (resolve) => {

        const body = JSON.stringify({
            dispute: dispute
        })

        try {
            const res = await fetch('/api/disputes/save-target', {
                method: 'PUT',
                headers: jsonHeaders,
                body: body,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data, success } = await res.json()
            mutate(`/api/games/${data._id}`, data, false)
            resolve(success)

        } catch (error) {
            console.log('Could not save target - saveTarget: ' + error)
            resolve(false)
        }
    })
}

export async function adjudicateDisputeSave(dispute) {
    const body = JSON.stringify({
        dispute: dispute
    })

    return new Promise(async (resolve) => {
        try {
            const res = await fetch('/api/disputes/adjudicate-save', {
                method: 'PUT',
                headers: jsonHeaders,
                body: body,
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data, success } = await res.json()
            resolve(success)

        } catch (error) {
            console.log('Could not adjudicate dispute (save): ' + error)
            resolve(false, error)
        }
    })
}