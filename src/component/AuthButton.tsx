"use client";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";

export default function AuthButton() {
    const route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // örnek olarak

    return isLoggedIn ? (
        <ProfileMenu onLogout={() => setIsLoggedIn(false)} />
    ) : (
        <button
            onClick={()=>(route.push('/auth'))}
            className="bg-[#0090FF] text-white rounded-full px-6 py-1 text-sm font-medium"
        >
            Log in
        </button>
    );
}
