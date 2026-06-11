"use client"

import EmbedClient from '@/components/EmbedClient'
import getCurrentUser from '@/hooks/getCurrentUser';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux'

function page() {

    getCurrentUser();

    const userData = useSelector((state: any) => state.user.userData);

    if (!userData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-12 w-12 animate-spin text-black-600" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <EmbedClient ownerId={userData._id} />
        </div>
    )
}

export default page
