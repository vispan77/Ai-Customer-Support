"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation';
import axios from "axios";

function DashboardClient({ ownerId }: { ownerId: string }) {
    const [businessName, setBusinessName] = useState("");
    const [supportEmail, setSupportEmail] = useState("");
    const [knowledge, setKnowledge] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/settings/postandupdate", {
                ownerId,
                businessName,
                supportEmail,
                knowledge
            },
                { withCredentials: true }
            )
            setLoading(false);
            setSaved(true);
            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleGetSetting = async () => {
        try {
            if (!ownerId) {
                return;
            }

            const result = await axios.post("/api/settings/get", { ownerId }, { withCredentials: true });
            setBusinessName(result.data.data.businessName);
            setSupportEmail(result.data.data.supportEmail);
            setKnowledge(result.data.data.knowledge);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetSetting();
    }, [ownerId])

    const navigate = useRouter();
    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-800'>
            {/* navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-2xl 
                border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between' >
                    <div onClick={() => navigate.push("/")}
                        className='text-lg font-semibold tracking-tight cursor-pointer'>
                        Support <span className='text-zinc-400'>Ai</span>
                    </div>

                    <button onClick={() => navigate.push("/embed")}
                        className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100
                     transition-all cursor-pointer'
                    >
                        Embed Chat
                    </button>
                </div>

            </motion.div>

            <div className='flex justify-between px-4 py-20'>
                <motion.div
                    className='w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 mt-20'
                >
                    <div className='mb-10'>
                        <h1 className='text-2xl font-semibold'>
                            ChatBot Setting
                        </h1>
                        <p className='text-zinc-500 mt-1'>
                            Manage your chatbot knowledge and business details
                        </p>
                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>
                            Business Details
                        </h1>
                        <div className='space-y-4'>
                            <input
                                value={businessName}
                                onChange={(event) => setBusinessName(event.target.value)}
                                type="text"
                                placeholder='Business Name'
                                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm
                                focus:outline-none focus:ring-2 focus:ring-black/80'
                            />
                            <input
                                value={supportEmail}
                                onChange={(event) => setSupportEmail(event.target.value)}
                                type="text"
                                placeholder='Support Email'
                                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-black/80'
                            />
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>
                            Knowledge Base
                        </h1>
                        <p className='text-sm text-zinc-500 mb-4'>
                            Add FAQs, policies, delivery info, refunds, etc.
                        </p>
                        <div className='space-y-4'>
                            <textarea
                                value={knowledge}
                                onChange={(event) => setKnowledge(event.target.value)}
                                className='w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-black/80'
                                placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3–5 working days
• Cash on Delivery available
• Support hours`}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-5'>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loading}
                            onClick={handleSubmit}
                            className="px-7 py-3 rounded-xl bg-black text-white text-sm 
                            font-medium hover:bg-zinc-800 transition disabled:opacity-60
                            cursor-pointer"
                        >
                            {
                                loading ? "Saving..." : "Save"
                            }
                        </motion.button>

                        {
                            saved && <motion.span
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm font-medium text-emerald-600"
                            >
                                ✓ Settings saved
                            </motion.span>
                        }

                    </div>

                </motion.div>

            </div>

        </div>
    )
}

export default DashboardClient
