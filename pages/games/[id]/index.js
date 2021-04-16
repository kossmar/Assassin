import React, { useState, useEffect } from 'react'
import Layout from "../../../components/Layout"
import { useRouter } from 'next/router'
import { useGame } from '../../../lib/hooks/useGame'
import { useUser } from '../../../lib/hooks/useUser'

const ThisGame = () => {

    const user = useUser({ redirectIfUnauthorized: '/login' })

    const router = useRouter()
    const { id } = router.query

    const { gameResult, error } = useGame(id)

    if (error) return <p>Failed to load</p>
    if (!gameResult || !user) {
        return (
            <>
                <Layout>
                    <div className='flex place-content-center text-center mx-auto w-1/3'>
                        <p>Loading...</p>
                    </div>
                </Layout>
            </>
        )
    } else {
        return (
            <>
                <GameComponent key={gameResult._id} gameResult={gameResult} user={user} />
            </>
        )
    }
}

export default ThisGame