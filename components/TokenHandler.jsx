"use client";

import { useTokenFromQuery } from "@/hooks/useTokenFromQuery";

export default function TokenHandler() {
    useTokenFromQuery();
    return null;
}
