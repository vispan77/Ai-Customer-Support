"use client"

import DashboardClient from '@/components/DashboardClient';
import getCurrentUser from '@/hooks/getCurrentUser';

import React from 'react'
import { useSelector } from 'react-redux'

function page() {
    getCurrentUser();


    const userData = useSelector((state: any) => state.user.userData);


    return (
        <div>
            <DashboardClient ownerId={userData._id} />
        </div>
    )
}

export default page
