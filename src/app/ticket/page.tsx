"use client";

import { useEffect, useState } from "react";
import { getActiveUser, getTicketsByUser } from "../../utils/storage";
import Layout from "@/component/ui/layout";

interface Ticket {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  price: number;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const user = getActiveUser();
    if (user) {
      const userTickets = getTicketsByUser(user.email);
      setTickets(userTickets);
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">Biletlerim</h1>
        {tickets.length === 0 ? (
          <p>Hiç biletiniz yok.</p>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket, idx) => (
              <div
                key={idx}
                className="border border-gray-300 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-medium">{ticket.from} ➝ {ticket.to}</p>
                  <p className="text-sm text-gray-600">
                    Gidiş: {ticket.departureDate}
                    {ticket.returnDate && ` | Dönüş: ${ticket.returnDate}`}
                  </p>
                </div>
                <div className="text-blue-600 font-semibold text-lg mt-2 md:mt-0">
                  {ticket.price}€
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
