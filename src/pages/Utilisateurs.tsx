import { useGetServiceListingQuery } from "@/Redux/features/dashboard/Utilisateurs/getServiceListingApi";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaFilter, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";

const allServices = [
  {
    id: "1",
    name: "Professional Web Development",
    description: "Custom website development services",
    provider: "John Smith",
    category: "IT & Software",
    location: "New York, USA",
    status: "Approved",
    listedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Business Consulting Services",
    description: "Strategic business consulting and planning",
    provider: "Sarah Johnson",
    category: "Business",
    location: "London, UK",
    status: "Pending",
    listedDate: "2024-01-14",
  },
  {
    id: "3",
    name: "Interior Design Services",
    description: "Complete interior design and decoration",
    provider: "Michael Brown",
    category: "Design",
    location: "Paris, France",
    status: "Rejected",
    listedDate: "2024-01-13",
  },
  {
    id: "4",
    name: "Legal Consultation",
    description: "Professional legal advice and consultation",
    provider: "Emily Davis",
    category: "Legal",
    location: "Toronto, Canada",
    status: "Approved",
    listedDate: "2024-01-12",
  },
  {
    id: "5",
    name: "Marketing Strategy",
    description: "Digital marketing and brand strategy",
    provider: "David Wilson",
    category: "Marketing",
    location: "Sydney, Australia",
    status: "Pending",
    listedDate: "2024-01-11",
  },
  {
    id: "6",
    name: "Photography Services",
    description: "Event and portrait photography",
    provider: "Olivia White",
    category: "Arts & Crafts",
    location: "Los Angeles, USA",
    status: "Approved",
    listedDate: "2024-01-10",
  },
  {
    id: "7",
    name: "Fitness Coaching",
    description: "Personalized fitness and nutrition plans",
    provider: "Daniel Green",
    category: "Health & Wellness",
    location: "Berlin, Germany",
    status: "Pending",
    listedDate: "2024-01-09",
  },
  {
    id: "8",
    name: "Financial Planning",
    description: "Investment and retirement planning",
    provider: "Sophia Black",
    category: "Finance",
    location: "Tokyo, Japan",
    status: "Approved",
    listedDate: "2024-01-08",
  },
  {
    id: "9",
    name: "Graphic Design",
    description: "Logo, branding, and web graphics",
    provider: "Liam Blue",
    category: "Design",
    location: "Melbourne, Australia",
    status: "Rejected",
    listedDate: "2024-01-07",
  },
  {
    id: "10",
    name: "Content Writing",
    description: "SEO-friendly articles and blog posts",
    provider: "Emma Red",
    category: "Writing & Translation",
    location: "Dublin, Ireland",
    status: "Pending",
    listedDate: "2024-01-06",
  },
  {
    id: "11",
    name: "Mobile App Development",
    description: "iOS and Android app creation",
    provider: "Noah Grey",
    category: "IT & Software",
    location: "San Francisco, USA",
    status: "Approved",
    listedDate: "2024-01-05",
  },
];

// --- Main App Component ---
const Utilisateurs = () => {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    location: "",
    dateRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      category: "",
      location: "",
      dateRange: "",
    });
    setCurrentPage(1);
  };

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      return (
        (filters.status === "" || service.status === filters.status) &&
        (filters.category === "" ||
          service.category.includes(filters.category)) &&
        (filters.location === "" ||
          service.location.includes(filters.location)) &&
        (filters.dateRange === "" ||
          service.listedDate.startsWith(filters.dateRange)) // Simple date range check
      );
    });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const getStatusClasses = (status: any) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Unique filter options from data
  const uniqueCategories = useMemo(
    () => [...new Set(allServices.map((s) => s.category))],
    []
  );
  const uniqueLocations = useMemo(
    () => [...new Set(allServices.map((s) => s.location))],
    []
  );
  const uniqueStatuses = useMemo(
    () => [...new Set(allServices.map((s) => s.status))],
    []
  );

  // Action handlers
  const handleEdit = (id: any) => console.log("Edit service:", id);
  const handleView = (id: any) => console.log("View service:", id);
  const handleDelete = (id: any) => console.log("Delete service:", id);
  const handleAddNewService = () => console.log("Add New Service clicked");




  const {data}=useGetServiceListingQuery(undefined)
  console.log(data)

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans sm:p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Service Listings
        </h1>
        <button className="bg-[#F9AA43] flex  gap-2 items-center justify-center p-2 px-4 rounded-xl text-white" onClick={handleAddNewService}>
          <FaPlus /> Add New Service
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center gap-2 text-gray-600">
          <FaFilter className="size-4" />
          <span className="font-medium">Filters:</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Status</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Category</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Location</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <input
            type="date"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Date Range"
          />

          <button

            onClick={handleClearFilters}
            className="w-full justify-center lg:col-span-1"
          >
            <FaTimes className="size-3" /> Clear Filters
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Service Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Provider
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Listed Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentServices.length > 0 ? (
              currentServices.map((service) => (
                <tr key={service.id}>
                  <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {service.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.description}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 sm:px-6">
                    {service.provider}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 sm:px-6">
                    {service.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 sm:px-6">
                    {service.location}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                    <span
                      className=
                      {`inline-flex rounded-full px-2 text-xs font-semibold leading-5
                      ${getStatusClasses(service.status)}`}

                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 sm:px-6">
                    {service.listedDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium sm:px-6">
                    <div className="flex items-center gap-2">
                      <button

                        onClick={() => handleEdit(service.id)}
                        title="Edit"
                      >
                        <FaEdit className="size-4 text-blue-500" />
                      </button>
                      <button

                        onClick={() => handleView(service.id)}
                        title="View"
                      >
                        <FaEye className="size-4 text-gray-500" />
                      </button>
                      <button

                        onClick={() => handleDelete(service.id)}
                        title="Delete"
                      >
                        <FaTrashAlt className="size-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-8 text-center text-gray-500 col-span-7">
                  No services found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
            className="rounded-md border border-gray-300 bg-white py-1 pl-2 pr-8 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredServices.length)} of{" "}
          {filteredServices.length} entries
        </div>

        <nav
          className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button

            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-l-md"
          >
            <FaChevronLeft className="size-3" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}

              onClick={() => paginate(page)}
              className={`
              "relative z-10 ",
              ${currentPage === page
                  ? " bg-[#F9AA43] text-white cursor-pointer px-2"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer px-2"}
            `}
            >
              {page}
            </button>
          ))}

          <button

            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-r-md"
          >
            <FaChevronRight className="size-3" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Utilisateurs;