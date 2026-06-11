"use client";

import { setUserData } from "@/redux/slice/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function getCurrentUser() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGetCurrentUser = async () => {
            try {
                const result = await axios.get(
                    "/api/auth/getuser",
                    { withCredentials: true }
                );

                dispatch(setUserData(result.data.data));
            } catch (error) {
                console.log(error);
            }
        };

        handleGetCurrentUser();
    }, [dispatch]);
}

export default getCurrentUser;
