"use client"
// components/FlightSearch.tsx
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser, saveTicket } from "../utils/storage";
import { airports } from "../data/airports";

interface Props {
  onTicketBought?: () => void;
}

export default function FlightSearch({ onTicketBought }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [filteredFrom, setFilteredFrom] = useState<typeof airports>([]);
  const [filteredTo, setFilteredTo] = useState<typeof airports>([]);
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!fromRef.current?.contains(e.target as Node)) setShowFromList(false);
      if (!toRef.current?.contains(e.target as Node)) setShowToList(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filterAirports = (value: string) =>
    airports.filter(
      a =>
        a.name.toLowerCase().includes(value.toLowerCase()) ||
        a.city.toLowerCase().includes(value.toLowerCase()) ||
        a.code.toLowerCase().includes(value.toLowerCase())
    );

  const getDayPrice = () => Math.floor(Math.random() * 100) + 50;

  const handleBuy = () => {
    const user = getActiveUser();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!from || !to || !departureDate) return;

    const ticket = {
      from,
      to,
      departureDate,
      returnDate: returnDate || undefined,
      price: getDayPrice(),
    };

    saveTicket(user.email, ticket);
    onTicketBought?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto mt-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Uçuş Ara</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Nereden */}
        <div ref={fromRef} className="relative">
          <label className="block text-sm font-medium mb-1">Nereden</label>
          <input
            value={from}
            onChange={e => {
              setFrom(e.target.value);
              setFilteredFrom(filterAirports(e.target.value));
              setShowFromList(true);
            }}
            onFocus={() => setShowFromList(true)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Şehir, havalimanı adı ya da kodu"
          />
          {showFromList && filteredFrom.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-auto shadow-md mt-1 rounded">
              {filteredFrom.map((a, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFrom(`${a.city} - ${a.name} (${a.code})`);
                    setShowFromList(false);
                  }}
                >
                  {a.city} - {a.name} ({a.code})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nereye */}
        <div ref={toRef} className="relative">
          <label className="block text-sm font-medium mb-1">Nereye</label>
          <input
            value={to}
            onChange={e => {
              setTo(e.target.value);
              setFilteredTo(filterAirports(e.target.value));
              setShowToList(true);
            }}
            onFocus={() => setShowToList(true)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Şehir, havalimanı adı ya da kodu"
          />
          {showToList && filteredTo.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-auto shadow-md mt-1 rounded">
              {filteredTo.map((a, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTo(`${a.city} - ${a.name} (${a.code})`);
                    setShowToList(false);
                  }}
                >
                  {a.city} - {a.name} ({a.code})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Gidiş tarihi */}
        <div>
          <label className="block text-sm font-medium mb-1">Gidiş Tarihi</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0]}
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Dönüş tarihi */}
        <div>
          <label className="block text-sm font-medium mb-1">Dönüş Tarihi</label>
          <input
            type="date"
            min={departureDate || new Date().toISOString().split("T")[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0]}
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Bilet Al */}
      <div className="mt-6 text-center">
        <button
          onClick={handleBuy}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Bilet Al
        </button>
      </div>
    </div>
  );
}
