

import { useGetMetaDataQuery } from "@/Redux/features/dashboard/dashboard/metadataApi";
import { useGetMonthlyStatusQuery } from "@/Redux/features/dashboard/dashboard/monthlyStatus";
import { useGetPiChartQuery } from "@/Redux/features/dashboard/dashboard/pieChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dummy replacements for missing UI components, styled with Tailwind
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-md shadow bg-white ${className}`}>{children}</div>
)
const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
)
const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <span
    className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${className}`}
  >
    {children}
  </span>
)



const serviceDistribution = [
  { name: "Réparation", value: 40, color: "#3B82F6" },
  { name: "Entretien", value: 30, color: "#10B981" },
  { name: "Diagnostic", value: 20, color: "#F59E0B" },
  { name: "Autres", value: 10, color: "#6B7280" },
]

const recentActivities = [
  {
    date: "23 Jan 2024",
    type: "Réservation",
    user: "Jean Dupont",
    action: "Nouvelle réservation",
    status: "En attente",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    date: "23 Jan 2024",
    type: "Vérification",
    user: "Marie Martin",
    action: "Soumission documents",
    status: "Approuvé",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    date: "22 Jan 2024",
    type: "Support",
    user: "Pierre Bernard",
    action: "Nouveau ticket",
    status: "En cours",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    date: "22 Jan 2024",
    type: "Service",
    user: "Sophie Petit",
    action: "Modification service",
    status: "Complété",
    statusColor: "bg-gray-100 text-gray-800",
  },
]


type DashboardMetrics = {
  activeUsers: number;
  bookingsToday: number;
  monthlyRevenue: number;
  verifiedProfessionals: number;
};

type monthlyType={
  month:string;
  count:number;
}


export default function Home() {
  // Removed selectedPeriod since it's unused; if you want to keep it, just remove the comment
  // const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const{data:piChart}=useGetPiChartQuery(undefined)
  console.log(piChart)

   const {data:monthlyStatus}=useGetMonthlyStatusQuery(undefined)
   

   const month = monthlyStatus?.data?.map((item:monthlyType) => ({
  month: item.month,
  value: item.count,
}));



  const {data}=useGetMetaDataQuery(undefined)
   if (!data) {
    return <div>Loading...</div>;  // Or spinner, skeleton etc.
  }
   const { activeUsers, bookingsToday, monthlyRevenue, verifiedProfessionals } = data?.data as DashboardMetrics;


  

  return (
    <div className="min-h-screen  ">
      <div className="  space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                <div className="flex items-baseline space-x-2 justify-between">
                  <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Professionnels vérifiés</p>
                <div className="flex items-baseline space-x-2 justify-between">
                  <p className="text-2xl font-bold text-gray-900">{verifiedProfessionals}</p>
                  <span className="text-sm font-medium text-green-600">+5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Réservations du jour</p>
                <div className="flex items-baseline space-x-2 justify-between">
                  <p className="text-2xl font-bold text-gray-900">{bookingsToday}</p>
                  <span className="text-sm font-medium text-green-600">+8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Revenu mensuel</p>
                <div className="flex items-baseline space-x-2 justify-between">
                  <p className="text-2xl font-bold text-gray-900">{monthlyRevenue}</p>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card>
            <CardHeader className="p-4 border-b border-gray-200">
              <CardTitle>Réservations mensuelles</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={month}>
                    <XAxis
                      dataKey="month"
                      // axisLine={true} // this is the default, so you can omit this line altogether
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis
                      // axisLine={true} // default true, so omit this line too
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      domain={[0, 100]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {serviceDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      TYPE
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      UTILISATEUR
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      ACTION
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      STATUT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-900">{activity.date}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{activity.type}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{activity.user}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{activity.action}</td>
                      <td className="py-4 px-4">
                        <Badge className={`${activity.statusColor} border-0`}>
                          {activity.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
