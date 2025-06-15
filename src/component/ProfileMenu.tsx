"use client";
import { useState, useRef } from "react";

type Props = {
    onLogout: () => void;
};

export default function ProfileMenu({ onLogout }: Props) {
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
                Profile
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 py-2 text-sm text-black">
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Settings
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                            onClick={onLogout}
                        >
                            Log out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
