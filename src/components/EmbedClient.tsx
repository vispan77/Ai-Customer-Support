"use client"

import { motion } from "motion/react"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function EmbedClient({ ownerId }: { ownerId: string }) {
    const navigate = useRouter();
    const [copied, setCopied] = useState(false)

    const embedCode = `
    <script 
        src="${process.env.NEXT_PUBLIC_BASE_URL}/chatBot.js" 
        data-owner-id="${ownerId}"
    >
    </script>
    `

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <div className='sticky top-0 z-0 bg-white border-b border-zinc-200'>
                <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div onClick={() => navigate.push("/")}
                        className='text-lg font-semibold cursor-pointer '>
                        Support
                        <span className="text-zinc-400">
                            Ai
                        </span>
                    </div>

                    <button onClick={() => navigate.push("/dashboard")}
                        className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100
                     transition-all cursor-pointer"
                    >Back to Dashboard</button>

                </div>
            </div>

            <div className='flex justify-center px-4 py-14'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10"
                >
                    <h1>
                        Embed ChatBot
                    </h1>
                    <p className="mb-5">
                        Copy and paste this code before <code>&lt;/body&gt;</code>
                    </p>

                    <div className="relative bg-zinc-900 text-zinc-100 rounded-lg p-2 text-sm font-mono
                    mb-10"
                    >
                        <pre className="overflow-x-auto">
                            {embedCode}
                        </pre>

                        <button onClick={copyCode}
                            className="absolute top-3 right-3 bg-white text-zinc-900 text-sm font-medium
                            px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-all cursor-pointer"
                        >
                            {
                                copied ? "Copied ✓" : "Copy"
                            }
                        </button>

                    </div>

                    <ul className="space-y-3 text-sm text-zinc-600 list-decimal list-inside">
                        <li>Copy the embed script</li>
                        <li>Paste it before the closing body tag</li>
                        <li>Reload your website</li>
                    </ul>

                    <div className="mt-14">
                        <h1 className="text-lg font-medium mb-2">
                            Live Preview
                        </h1>
                        <p className="text-sm text-zinc-500 mb-6">
                            This is how the chatbot will appear on your website
                        </p>

                        <div className="bg-white rounded-xl shadow-md border border-zinc-300 overflow-hidden">
                            <div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
                                <span className='w-2.5 h-2.5 rounded-full bg-red-400' />
                                <span className='w-2.5 h-2.5 rounded-full bg-yellow-400' />
                                <span className='w-2.5 h-2.5 rounded-full bg-green-400' />
                                <span className='ml-4 text-xs text-zinc-500'>
                                    Your-website.com
                                </span>
                            </div>

                            <div className='relative h-64 sm:h-72 p-6 text-zinc-400 text-sm'>
                                Your website goes here

                                <div className="absolute bottom-24 right-6 w-64 bg-white rounded-xl shadow-xl
                                   boder border-zinc-200 overflow-hidden"
                                >
                                    <div className='bg-black text-white text-xs px-3 py-2 flex justify-between 
                                        items-center'
                                    >
                                        <span>
                                            Customer Support
                                        </span>
                                        <span>
                                            X
                                        </span>
                                    </div>

                                    <div className='p-3 space-y-2 bg-zinc-50'>
                                        <div className='bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit'>
                                            hi! how can I help you?
                                        </div>
                                        <div className='bg-black text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit'>
                                            what is the return policy?
                                        </div>
                                    </div>

                                </div>

                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black
                                     text-white flex items-center justify-center shadow-2xl cursor-pointer"
                                >
                                    🗨️
                                </motion.div>
                            </div>
                        </div>

                    </div>

                </motion.div>

            </div>

        </div>
    )
}

export default EmbedClient

