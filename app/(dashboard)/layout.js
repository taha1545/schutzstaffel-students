"use client";

import { TacticalLayout } from "@/components/TacticalLayout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
    const { refreshUser } = useAuth();

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    return (
        <TacticalLayout>
            {children}
        </TacticalLayout>
    );
}