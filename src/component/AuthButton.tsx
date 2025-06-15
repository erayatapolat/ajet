"use client";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";
import { getActiveUser } from "@/utils/storage";

export default function AuthButton() {
    const route = useRouter();
    const user = getActiveUser();

    return user ? (
        <ProfileMenu />
    ) : (
        <button
            onClick={()=>(route.push('/auth'))}
            className="bg-[#0090FF] text-white rounded-full px-6 py-1 text-sm font-medium"
        >
            Log in
        </button>
    );
}
