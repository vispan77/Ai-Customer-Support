"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import LoginModal from '@/components/LoginModal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';


function HomeClient() {

    const userData = useSelector((state: any) => state.user.userData);

    const dispatch = useDispatch();

    const [openLogin, setopenLogin] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

    const navigate = useRouter();

    const features = [
        {
            title: "Plug & Play",
            desc: "Add the chatbot to your site with a single script tag."
        },
        {
            title: "Admin Controlled",
            desc: "You control exactly what the AI knows and answers."
        },
        {
            title: "Always Online",
            desc: "Your customers get instant support 24/7."
        }
    ]



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setOpenProfile(false);
            }
        };

        if (openProfile) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openProfile]);

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 
          overflow-x-hidden'
        >

            {/* navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-2xl 
                border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between' >
                    <div className='text-lg font-semibold tracking-tight'>
                        Support <span className='text-zinc-400'>Ai</span>
                    </div>

                    {
                        userData ? (
                            <div className="flex items-center gap-4" >
                                <div className='relative' ref={popupRef}>
                                    <button onClick={() => setOpenProfile(!openProfile)}
                                        className="w-8 h-8 flex items-center justify-center text-md
                                         text-white font-semibold rounded-full shadow-2xl bg-black
                                         cursor-pointer hover:scale-105"
                                    >
                                        {userData.name?.charAt(0).toUpperCase()}
                                    </button>
                                    <AnimatePresence>
                                        {
                                            openProfile && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className='absolute right-0 mt-3 w-44 bg-white rounded-xl
                                                    shadow-xl border border-zinc-200 overflow-hidden'
                                                >
                                                    <button onClick={() => navigate.push("/dashboard")}
                                                        className='w-full text-center px-4  py-3 text-sm hover:bg-zinc-100 cursor-pointer'>
                                                        Dashboard
                                                    </button>
                                                    <button onClick={handleLogout}
                                                        className='w-full text-center px-4 py-3 text-sm text-red-600 hover:bg-zinc-100 cursor-pointer'>
                                                        logout
                                                    </button>

                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                </div>

                            </div>
                        ) : (
                            <button
                                onClick={() => setopenLogin(true)}
                                className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800
                                transition-all disabled:opacity-60 flex items-center gap-2 cursor-pointer'
                            >
                                Login
                            </button>
                        )
                    }

                </div>

            </motion.div>

            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 item-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className=''
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            Ai Customer Support
                            <br />
                            Built for Modern Websites.
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerfull Ai chatbot to your wensite in minutes.
                            Let your customer get instant answer using your own business knowledge.
                        </p>

                        <div className='mt-10 flex gap-4'>
                            <button onClick={() => {
                                if (userData) {
                                    navigate.push("/dashboard");
                                } else {
                                    setopenLogin(true);
                                }
                            }}

                                className='px-7 py-3 rounded-xl bg-black text-white font-medium
                             hover:bg-zinc-800 transition-all disabled:opacity-60 cursor-pointer'
                            >
                                {userData ? "Go to Dashboard" : "Get Started"}
                            </button>
                            <a href='#feature'
                                className='px-7 py-3 rounded-xl border-1 border-zinc-300 text-zinc-700
                             hover:bg-zinc-100 transition-all cursor-pointer'
                            >
                                Learn More
                            </a>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='ralative'
                    >
                        <div className='rounded-2xl shadow-2xl bg-white border border-zinc-200 p-6 relative'>
                            <div className='text-sm text-zinc-500 mb-3'>
                                Live chat preview
                            </div>

                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>
                                    Do you offer Cash on Delivery ?
                                </div>
                                <div className='px-4 py-2 text-sm rounded-lg bg-zinc-100 w-fit'>
                                    yes, cash on delivery is available
                                </div>
                            </div>

                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className='absolute -bottom-6 -right-6 w-14 h-14 rounded-full shadow-xl bg-black text-white
                                flex items-center justify-center'
                            >
                                💬
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </section>

            <section id='feature'
                className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'>
                <div className='max-w-6xl mx-auto'>
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className='text-3xl font-semibold text-center'
                    >
                        Why businesses choose Ai Customer Support
                    </motion.h2>

                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {features.map((f, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: false }}
                                className="
                                    bg-white rounded-2xl
                                    p-8 shadow-lg 
                                    border border-zinc-200
                                    "
                            >
                                <h1 className='text-lg font-medium'>{f.title}</h1>
                                <p className='mt-3 text-zinc-600 text-sm'>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </section>

            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} Customer Support AI. All rights reserved.
            </footer>

            {
                openLogin && <LoginModal open={openLogin} onClose={() => setopenLogin(false)} />
            }
        </div>
    )
}

export default HomeClient
