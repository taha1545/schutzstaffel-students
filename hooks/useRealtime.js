"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export function useRealtime(events = [], onEvent) {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const action = () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) setToken(storedToken);
        }
        action();
    }, []);

    useEffect(() => {
        if (!token) return;
        socket = io(process.env.NEXT_PUBLIC_IMAGE_URL, {
            auth: { token },
        });

        // 
        events.forEach((event) => {
            socket.on(event, (data) => onEvent(event, data));
        });

        // 
        return () => {
            events.forEach((event) => socket.off(event));
            socket.disconnect();
        };
    }, [token, JSON.stringify(events), onEvent]);
}
