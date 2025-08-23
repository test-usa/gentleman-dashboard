import { Input } from "@/components/ui/input";
import { useGetPaymentAndBookingQuery } from "@/Redux/features/dashboard/history/getPaymentAndBookingApi";
import { useGetTranstionIdQuery } from "@/Redux/features/dashboard/history/getTranstionIdApi";
import { useGetUpCommingQuery } from "@/Redux/features/dashboard/history/getUpCommingBooking";

import img from "../assets/FRAME.png";

import {
  CalendarDays,
  CheckCircle,
  DollarSign,
  Clock,
  ListFilter,
} from "lucide-react";

import { useState, type JSX, type ReactNode } from "react";
import { MdSearch } from "react-icons/md";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type TFormattedBooking = {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  desireDate: string;
  method: string;
  price: string;
  vehicleImage: string;
  methodIcon: JSX.Element;
  icon: JSX.Element;
};

interface TTransactionItem {
  id: string;
  senderPaymentTransaction: string;
  serviceTitle: string;
  updatedAt: string;
  amount: string;
  status: string;
  method: string;
  methodIcon: ReactNode;
  icon: ReactNode;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllBookings, setShowAllBookings] = useState(false);

  const demoTransactions: TTransactionItem[] = [
    {
      id: "demo1",
      senderPaymentTransaction: "TXN123456",
      serviceTitle: "Service Démo 1",
      updatedAt: new Date().toISOString(),
      amount: "$100",
      status: "Terminé",
      method: "Carte de Crédit",
      methodIcon: <DollarSign className="w-4 h-4 text-gray-600" />,
      icon: <CheckCircle />,
    },
    {
      id: "demo2",
      senderPaymentTransaction: "TXN789101",
      serviceTitle: "Service Démo 2",
      updatedAt: new Date().toISOString(),
      amount: "$200",
      status: "En attente",
      method: "PayPal",
      methodIcon: <DollarSign className="w-4 h-4 text-gray-600" />,
      icon: <Clock />,
    },
  ];

  const { data } = useGetPaymentAndBookingQuery(undefined);
  const { data: transtion } = useGetTranstionIdQuery(undefined);
  const { data: upcomming } = useGetUpCommingQuery(undefined);

  console.log("data:", data, "transtion:", transtion, "upcoming:", upcomming);

  const transactionsToDisplay =
    transtion?.data && transtion.data.length > 0
      ? transtion.data.filter((item: TTransactionItem) =>
          item.senderPaymentTransaction
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : demoTransactions.filter((item) =>
          item.senderPaymentTransaction
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

  if (!data || !transtion || !upcomming) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const summary = [
    {
      title: "Réservations Actives",
      value: data?.data?.activeBookings ?? 0,
      desc: "À venir",
      icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Réservations Terminées",
      value: data?.data?.completedBookings ?? 0,
      desc: "Ce mois-ci",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Revenu Total",
      value: `$${data?.data?.totalRevenueThisMonth?.toFixed(2) ?? "0.00"}`,
      desc: "Ce mois-ci",
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Paiements en attente",
      value: `$${data?.data?.pendingPaymentsThisMonth?.toFixed(2) ?? "0.00"}`,
      desc: "À collecter",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
    },
  ];

  const bookings = showAllBookings
    ? upcomming?.data?.data || []
    : upcomming?.data?.data?.slice(0, 3) || [];

  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold px-5">Réservations</h1>
        <hr className="my-4" />
      </div>

      <div className="mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 items-center space-x-3"
            >
              <div className="bg-gray-100 p-2 w-10 rounded-md">{item.icon}</div>
              <div>
                <h4 className="text-gray-600">{item.title}</h4>
                <p className="text-xl font-semibold">{item.value}</p>
                <span className="text-sm text-gray-400">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div>
          <div className="flex items-center justify-between mx-4">
            <h2 className="text-xl font-semibold mb-3">
              Réservations à venir
            </h2>
            <button
              onClick={() => setShowAllBookings(!showAllBookings)}
              className="text-[#F9AA43] text-sm cursor-pointer"
            >
              {showAllBookings ? "Voir moins" : "Voir tout"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookings.map((item: TFormattedBooking, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded shadow space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.vehicleImage || img}
                      alt="Véhicule"
                      className="w-6 h-6 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-700">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleString("fr-FR", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status === "Completed"
                      ? "Terminé"
                      : item.status === "Pending"
                      ? "En attente"
                      : "Annulé"}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>
                      {(() => {
                        const date = new Date(item.desireDate);
                        const now = new Date();
                        const diffInMs = now.getTime() - date.getTime();
                        const hoursAgo = Math.floor(
                          diffInMs / (1000 * 60 * 60)
                        );
                        return `Il y a ${hoursAgo} heure${
                          hoursAgo !== 1 ? "s" : ""
                        }`;
                      })()}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="my-3">
          <div className="flex items-center justify-between mx-3 mb-4">
            <h2 className="text-xl font-semibold mb-3">
              Historique des Transactions
            </h2>
            <div className="flex gap-3">
              <div className="max-w-sm w-full relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Rechercher des transactions..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <ListFilter className="w-5 h-5 text-gray-600" />
                <p>Filtrer</p>
              </div>
            </div>
          </div>

          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">ID de Transaction</th>
                  <th className="py-2 px-4 text-left">Service</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Montant</th>
                  <th className="py-2 px-4 text-left">Statut</th>
                  <th className="py-2 px-4 text-left">Mode de Paiement</th>
                </tr>
              </thead>
              <tbody>
                {transactionsToDisplay.map((item: TTransactionItem) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 px-4">
                      {item.senderPaymentTransaction}
                    </td>
                    <td className="py-2 px-4">{item.serviceTitle}</td>
                    <td className="py-2 px-4">
                      {new Date(item.updatedAt).toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-2 px-4">{item.amount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status === "Completed"
                          ? "Terminé"
                          : item.status === "Pending"
                          ? "En attente"
                          : "Annulé"}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex gap-5 items-center">
                        {item.methodIcon}
                        {item.method}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
