
"use client";
import { useState, useRef } from "react";

const languageOptions = [
    { label: "Türkçe", code: "TR" },
    { label: "Русский", code: "RU" },
    { label: "Español", code: "ES" },
    { label: "Italiano", code: "IT" },
];

export default function LanguageSelection() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("EN");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 200); // küçük bir gecikme menüye geçiş için zaman tanır
    };

    const handleSelect = (code: string) => {
        setSelected(code);
        setOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="bg-[#0090FF] text-white rounded-full px-4 py-1 text-sm font-medium">
                {selected}
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50 text-sm text-black overflow-hidden">
                    <ul className="flex flex-col">
                        {languageOptions.map((lang) => (
                            <li
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {lang.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


