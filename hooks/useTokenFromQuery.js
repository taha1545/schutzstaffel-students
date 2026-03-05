"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function useTokenFromQuery() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { refreshUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) return;

        const handleToken = async () => {
            try {
                localStorage.setItem("token", token);
                await refreshUser();
                // 
                router.replace("/", { scroll: false });
            } catch (err) {
                console.error("Token handling failed:", err);
            }
        };

        handleToken();
    }, [searchParams, refreshUser, router]);
}
