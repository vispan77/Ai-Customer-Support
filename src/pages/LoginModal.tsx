"use client"

import React from 'react';
import { motion } from "motion/react"
import { SparklesIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/slice/userSlice';



interface LoginModalProps {
    onClose: () => void;
    open: boolean;
}

function LoginModal({ onClose, open }: LoginModalProps) {

    const dispatch = useDispatch();

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            
            const result = await axios.post("/api/auth/login", {
                name: response.user.displayName,
                email: response.user.email,
                avatar: response.user.photoURL
            }, { withCredentials: true });
            
            dispatch(setUserData(result.data.data))
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                open && (
                    <motion.div
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm'
                    >
                        <motion.div
                            onClick={(event) => event.stopPropagation()}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='relative w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-zinc-200 text-center'
                        >
                            <div className=''>
                                <motion.button onClick={onClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='absolute top-2 right-5 text-2xl font-semibold cursor-pointer shadow-3xl'>
                                    x
                                </motion.button>

                                <div className='w-fit mx-auto  px-4 py-1 rounded-full flex items-center justify-center
                         bg-emerald-100 text-emerald-600 gap-2 mb-5 border border-emerald-200'>
                                    <SparklesIcon size={15} />
                                    <h3 className='text-sm font-semibold'>
                                        AI-powered Customer Support
                                    </h3>
                                </div>


                                <h2 className='text-3xl font-bold mb-10 text-zinc-900'>
                                    Welcome to Support { }
                                    <span className='text-zinc-400'>Ai</span>
                                </h2>

                                <motion.button
                                    onClick={handleGoogleAuth}
                                    whileHover={{ scale: 1.03, opacity: 0.9 }}
                                    whileTap={{ scale: 0.98, opacity: 1 }}
                                    className='bg-black text-white rounded-full shadow-2xl w-full py-3
                            cursor-pointer flex items-center justify-center gap-2 mb-10'
                                >
                                    <FcGoogle size={20} />
                                    Continue with Google


                                </motion.button>

                                <div className='flex items-center justify-center gap-4 mb-5'>
                                    <div className='h-[1px] flex-1 bg-black/10' />
                                    <span className='text-xs text-zinc-500 tracking-wide'>
                                        Secure Login
                                    </span>
                                    <div className='h-[1px] flex-1 bg-black/10' />
                                </div>

                                <p className='text-xs text-zinc-500'>
                                    By continuing you agree to our { }
                                    <span className='underline hover:text-black cursor-pointer'>
                                        Terms of Service { }
                                    </span>
                                    and { }
                                    <span className='underline hover:text-black cursor-pointer'>
                                        Privacy Policy
                                    </span>

                                </p>



                            </div>
                        </motion.div>

                    </motion.div>
                )
            }

        </>

    )
}

export default LoginModal
