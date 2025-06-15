import Layout from "@/component/ui/layout";

export default function Ticket() {
  const userName = "Doğukan Solak";

  const tickets = [
    {
      id: 1,
      from: "İstanbul",
      to: "Berlin",
      date: "2025-06-20",
      price: "1200₺",
      purchaseDate: "2025-06-10 15:30",
      flightTime: "2025-06-20 09:00"
    },
  ];

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-b from-[#0090FF] to-[#002B5B] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Merhaba, {userName} 👋</h1>
        <h2 className="text-2xl font-semibold mb-8">Biletlerin</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-200">Henüz biletin yok.</p>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white/90 text-gray-800 rounded-2xl shadow-lg p-6 hover:scale-[1.01] transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xl font-semibold">
                    ✈️ {ticket.from} → {ticket.to}
                  </div>
                  <div className="text-sm text-gray-500">{ticket.date}</div>
                </div>

                <div className="text-sm text-gray-600 mb-1">
                  Satın Alınma Tarihi: <span className="font-medium">{ticket.purchaseDate}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Uçuş Zamanı: <span className="font-medium">{ticket.flightTime}</span>
                </div>

                <div className="text-right text-lg font-bold text-[#002B5B]">
                  {ticket.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}