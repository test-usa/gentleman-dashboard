import { Input } from '@/components/ui/input';
import {
  CalendarDays,
  CheckCircle,
  DollarSign,
  Clock,
  CreditCard,
  Banknote,
  ListFilter
} from 'lucide-react';
const summary = [
  {
    title: 'Active Bookings',
    value: 3,
    desc: 'Upcoming',
    icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Completed Bookings',
    value: 12,
    desc: 'This Month',
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  },
  {
    title: 'Total Revenue',
    value: '$1,248.00',
    desc: 'This Month',
    icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: 'Pending Payments',
    value: '$245.00',
    desc: 'To Collect',
    icon: <Clock className="w-6 h-6 text-orange-500" />,
  },
];




import { Wrench } from 'lucide-react';
import { MdSearch } from 'react-icons/md';

const transactions = [
  {
    id: 'TRK-2023-001',
    service: 'Car Repair',
    date: 'Dec 1, 2023',
    amount: '$149.00',
    status: 'Completed',
    methodIcon: <CreditCard className="w-5 h-5 text-gray-700" />,
    method: '2 hours',
    icon: <Wrench className="w-6 h-6 text-blue-500" />
  },
  {
    id: 'TRK-2023-002',
    service: 'Car Repair',
    date: 'Dec 3, 2023',
    amount: '$89.00',
    status: 'Pending',
    method: '2 hours',
    methodIcon: <Banknote className="w-5 h-5 text-indigo-500" />,
    icon: <Wrench className="w-6 h-6 text-yellow-500" />
  },
  {
    id: 'TRK-2023-003',
    service: 'Car Repair',
    date: 'Dec 5, 2023',
    amount: '$269.00',
    status: 'Confirmed',
    method: '2 hours',
    methodIcon: <CreditCard className="w-5 h-5 text-purple-500" />,

    icon: <Wrench className="w-6 h-6 text-green-500" />

  },
  {
    id: 'TRK-2023-003',
    service: 'Car Repair',
    date: 'Dec 5, 2023',
    amount: '$269.00',
    status: 'Confirmed',
    method: '2 hours',
    methodIcon: <CreditCard className="w-5 h-5 text-purple-500" />,

    icon: <Wrench className="w-6 h-6 text-green-500" />

  },
  {
    id: 'TRK-2023-003',
    service: 'Car Repair',
    date: 'Dec 5, 2023',
    amount: '$269.00',
    status: 'Confirmed',
    method: '2 hours',
    methodIcon: <CreditCard className="w-5 h-5 text-purple-500" />,

    icon: <Wrench className="w-6 h-6 text-green-500" />

  },

];


const History = () => {

 return (

    <div className=''>
      <div>
        <h1 className='px-5'>Booking</h1>
        <hr className='my-4' />
      </div>
      <div className=" mx-auto   space-y-8 ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {summary.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 items-center space-x-3 ">
              <div className="bg-gray-100 p-2 w-10  rounded-md">{item.icon}</div>
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
          <div className='flex items-center justify-between mx-4'>
             <h2 className="text-xl font-semibold mb-3">Upcoming Bookings</h2>
             <h2 className='text-[#F9AA43] text-sm'>View All</h2>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transactions.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow space-y-3">
                {/* Icon + Service + Date + Status */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <div>
                      <h3 className="font-medium text-gray-700">{item.service}</h3>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${item.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : item.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Method + Amount */}
                <div className="flex justify-between text-sm text-gray-600">
                  <div className='flex gap-2'>
                    <span><Clock className="w-4 h-4 text-gray-500" />
                    </span>
                    <span>{item.method}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History section */ }
        <div className='my-3'>
          <div className='flex items-center justify-between mx-3 mb-4'>
            <h2 className="text-xl font-semibold mb-3">Transaction History</h2> 
            <div className='flex gap-3'>
              <div className="max-w-sm w-full relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-8 " 
            />
          </div>
             <div className='flex items-center gap-2'>
               <ListFilter className="w-5 h-5 text-gray-600" />

              <p>Filter</p>
             </div>
            </div>

          </div>
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="">
                <tr>
                  <th className="py-2 px-4 text-left">Transaction ID</th>
                  <th className="py-2 px-4 text-left">Service</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.service}</td>
                    <td className="py-2 px-4">{item.date}</td>
                    <td className="py-2 px-4">{item.amount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${item.status === 'Completed'
                            ? 'bg-green-100 text-green-600'
                            : item.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">

                      <div className='flex gap-5 items-center'>
                        {
                          item.methodIcon
                        }
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