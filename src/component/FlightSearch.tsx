"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser, saveTicket } from "../utils/storage";
import { airports } from "../data/airports";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props { onTicketBought?: () => void; }

const getDayPrice = (day: Date): number => 40 + (day.getDate() % 20);

export default function FlightSearch({ onTicketBought }: Props) {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depDate, setDepDate] = useState<Date>();
  const [retDate, setRetDate] = useState<Date>();
  const [showDep, setShowDep] = useState(false);
  const [showRet, setShowRet] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const depRef = useRef<HTMLDivElement>(null);
  const retRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!depRef.current?.contains(e.target as Node)) setShowDep(false);
      if (!retRef.current?.contains(e.target as Node)) setShowRet(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // havalimanı otokompleti
  const filterAirports = (val: string) =>
    airports.filter(a => a.name.toLowerCase().includes(val.toLowerCase()) ||
      a.city.toLowerCase().includes(val.toLowerCase()) ||
      a.code.toLowerCase().includes(val.toLowerCase()));

  // Bilet al işlemi
  const handleBuy = () => {
    const user = getActiveUser();
    if (!user) return router.push("/auth");
    if (!from || !to || !depDate) return;

    saveTicket(user.email, {
      from, to,
      departureDate: depDate.toISOString().split("T")[0],
      returnDate: retDate?.toISOString().split("T")[0],
      price: getDayPrice(depDate),
    });

    setShowToast(true);
    onTicketBought?.();
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow max-w-3xl mx-auto mt-8 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Uçuş Ara</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Nereden */}
        <div className="relative" ref={fromRef}>
          <label className="block text-sm">Nereden</label>
          <input value={from} onChange={e => setFrom(e.target.value)}
            className="w-full border px-3 py-2 rounded" placeholder="Şehir / Havalimanı" />
        </div>
        {/* Nereye */}
        <div className="relative" ref={toRef}>
          <label className="block text-sm">Nereye</label>
          <input value={to} onChange={e => setTo(e.target.value)}
            className="w-full border px-3 py-2 rounded" placeholder="Şehir / Havalimanı" />
        </div>
        {/* Gidiş */}
        <div className="relative" ref={depRef}>
          <label className="block text-sm">Gidiş Tarihi</label>
          <input readOnly value={depDate ? depDate.toLocaleDateString("tr-TR") : ""}
            onClick={() => setShowDep(true)}
            className="w-full border px-3 py-2 rounded cursor-pointer" />
          {showDep && (
            <DayPicker
              mode="single"
              selected={depDate}
              onSelect={d => { setDepDate(d!), setShowDep(false) }}
              fromDate={new Date()}
              toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              showOutsideDays
              components={{
                Day: ({ date, ...props }) => {
                  const isSelected =
                    (depDate && date.toDateString() === depDate.toDateString()) ||
                    (retDate && date.toDateString() === retDate.toDateString());

                  const price = getDayPrice(date);
                  return (
                    <div
                      {...props}
                      className={`flex flex-col items-center justify-center text-xs w-full h-full py-1 ${isSelected ? "bg-blue-600 text-white rounded" : ""
                        }`}
                    >
                      <span>{date.getDate()}</span>
                      <span className="text-blue-500 text-[10px]">{price} €</span>
                    </div>
                  );
                }
              }}
            />
          )}
        </div>
        {/* Dönüş */}
        <div className="relative" ref={retRef}>
          <label className="block text-sm">Dönüş Tarihi</label>
          <input readOnly value={retDate ? retDate.toLocaleDateString("tr-TR") : ""}
            onClick={() => setShowRet(true)}
            disabled={!depDate}
            className="w-full border px-3 py-2 rounded cursor-pointer disabled:opacity-50" />
          {showRet && (
            <DayPicker
              mode="single"
              selected={retDate}
              onSelect={d => { setRetDate(d!), setShowRet(false) }}
              fromDate={depDate ? new Date(depDate.getTime() + 864e5) : new Date()}
              toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              showOutsideDays
              components={{
                Day: ({ date, ...props }) => {
                  const isSelected =
                    (depDate && date.toDateString() === depDate.toDateString()) ||
                    (retDate && date.toDateString() === retDate.toDateString());

                  const price = getDayPrice(date);
                  return (
                    <div
                      {...props}
                      className={`flex flex-col items-center justify-center text-xs w-full h-full py-1 ${isSelected ? "bg-blue-600 text-white rounded" : ""
                        }`}
                    >
                      <span>{date.getDate()}</span>
                      <span className="text-blue-500 text-[10px]">{price} €</span>
                    </div>
                  );
                }
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button onClick={handleBuy} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Bilet Al</button>
      </div>

      {showToast && (
        <div className="absolute top-3 right-3 bg-green-500 text-white px-4 py-2 rounded shadow-lg">Bilet başarıyla eklendi!</div>
      )}
    </div>
  );
}
