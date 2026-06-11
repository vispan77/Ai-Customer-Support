"use client"

import EmbedClient from '@/components/EmbedClient'
import React from 'react'
import { useSelector } from 'react-redux'

function page() {
    const userData = useSelector((state: any) => state.user.userData)
    return (
        <div>
            <EmbedClient ownerId={userData._id} />
        </div>
    )
}

export default page
