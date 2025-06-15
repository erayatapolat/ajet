"use client";
import { getActiveUser } from "@/utils/storage";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";


export default function ProfileMenu() {
    const route = useRouter();
    const user = getActiveUser();
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };
    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="bg-white text-[#0090FF] rounded-full px-6 py-1 text-sm font-medium">
                {user?.name}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 py-2 text-sm text-black">
                    <ul className="flex flex-col">
                        <li onClick={()=>(route.push('/ticket'))} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Tickets
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                        >
                            Log out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
