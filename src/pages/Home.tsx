import { useGetMetaDataQuery } from "@/Redux/features/dashboard/dashboard/metadataApi";
import { useGetMonthlyStatusQuery } from "@/Redux/features/dashboard/dashboard/monthlyStatus";
import { useGetPiChartQuery } from "@/Redux/features/dashboard/dashboard/pieChart";
import { useGetReportsQuery } from "@/Redux/features/dashboard/dashboard/reportsApi";
import { useState } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Dummy UI components with Tailwind styles
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-md shadow bg-white ${className}`}>{children}</div>
);
const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);
const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);
const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
);
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${className}`}>{children}</span>
);

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#6B7280"];

type DashboardMetrics = {
  activeUsers: number;
  bookingsToday: number;
  monthlyRevenue: number;
  verifiedProfessionals: number;
};

type monthlyType = {
  month: string;
  count: number;
};

type ServiceDistributionItem = {
  service: string;
  count: number;
  percentage: string;
  entry: string;
};
type FormattedServiceItem = {
  name: string;
  value: number;
  color: string;
};
type Report = {
  id: string;
  createdAt: string;
  refundType?: string;
  description: string;
};

export default function Home() {
  const { data: piChart } = useGetPiChartQuery(undefined);
  const { data: monthlyStatus } = useGetMonthlyStatusQuery(undefined);
  const { data } = useGetMetaDataQuery(undefined);

    console.log("piechart:", piChart,  "monthlyStatus:", monthlyStatus, "data:",data)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { data: reportsData, isLoading } = useGetReportsQuery({ currentPage, limit: itemsPerPage });

  console.log(reportsData)

  if (!data) {
    return <div><LoadingSpinner></LoadingSpinner></div>;
  }

  const { activeUsers, bookingsToday, monthlyRevenue, verifiedProfessionals } =
    data?.data as DashboardMetrics;

  const formattedData: FormattedServiceItem[] =
    piChart?.data?.data?.map((item: ServiceDistributionItem, index: number) => ({
      name: item.service,
      value: item.count,
      color: COLORS[index % COLORS.length],
    })) || [];

  const month = monthlyStatus?.data?.map((item: monthlyType) => ({
    month: item.month,
    value: item.count,
  }));

  const reports = reportsData?.data?.data || [];
  const totalItems = reportsData?.data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  const paginate = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Utilisateurs actifs", value: activeUsers, growth: "+12%" },
          { title: "Professionnels vérifiés", value: verifiedProfessionals, growth: "+5%" },
          { title: "Réservations du jour", value: bookingsToday, growth: "+8%" },
          { title: "Revenu mensuel", value: monthlyRevenue, growth: "+15%" },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <span className="text-sm font-medium text-green-600">{item.growth}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle>Réservations mensuelles</CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={month}>
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} domain={[0, 100]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle>Distribution des services</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={formattedData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {formattedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {formattedData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {["DATE", "TYPE", "UTILISATEUR", "ACTION", "STATUT"].map((col) => (
                      <th
                        key={col}
                        className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report:Report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-900">
                        {format(new Date(report.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">{report.refundType || "N/A"}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">Utilisateur inconnu</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{report.description}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800 border-0">Pending</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* New Pagination Controls */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  const newLimit = Number(e.target.value);
                  setItemsPerPage(newLimit);
                  setCurrentPage(1);
                }}
                className="rounded-md border border-gray-300 bg-white py-1 pl-2 pr-8 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {[5, 10, 20, 50].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>

            <div className="text-sm text-gray-700">
              Showing {startItem} to {endItem} of {totalItems} entries
            </div>

            <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-l-md px-2 py-1 border cursor-pointer border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <FaChevronLeft className="size-3" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => paginate(pg)}
                  className={`relative z-10 px-2 py-1 border cursor-pointer text-sm ${
                    currentPage === pg
                      ? "bg-[#F9AA43] text-white border-[#F9AA43]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-r-md px-2 py-1 border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <FaChevronRight className="size-3" />
              </button>
            </nav>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
