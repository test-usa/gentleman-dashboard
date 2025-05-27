import { Button } from "@/components/ui/button";
import { FaExclamationTriangle, FaStar } from "react-icons/fa";

const Request = () => {
  return <div>
    {/* section header */}
    <div className="h-full bg-gray-50 p-6 font-sans">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Request Management
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="col-span-2 space-y-6">
          {/* Request Details Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-800">
                Request #RF-2024-0123
              </h2>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                Pending Review
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Submitted on</p>
                <p className="text-base font-medium text-gray-800">
                  Jan 23, 2024 at 10:45 AM
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Professional</p>
                <p className="text-base font-medium text-gray-800">
                  Michael Brown
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="text-base font-medium text-gray-800">
                  Sarah Johnson
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID:</p>
                <p className="text-base font-medium text-gray-800">
                  PRO-345678
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID:</p>
                <p className="text-base font-medium text-gray-800">
                  CUS-789012
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Request Amount</p>
              <p className="text-2xl font-bold text-gray-800">
                $249.99
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Select Action
            </h3>
            <div className="relative">
              <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>Select an action</option>
                <option>Approve Request</option>
                <option>Decline Request</option>
                <option>Request More Info</option>
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

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                Add a note (optional)
              </h3>
              <div className="relative">
                <textarea
                  className="block w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows={3}
                  placeholder="Enter your note here..."
                  maxLength={500}
                ></textarea>
                <p className="absolute bottom-2 right-3 text-xs text-gray-400">
                  0/500 characters
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center rounded-md bg-orange-50 p-3 text-orange-700">
              <FaExclamationTriangle className="mr-2 size-5" />
              <p className="text-sm">
                <span className="font-semibold">Action Preview</span>
                <br />
                Select an action to see the preview and potential impact.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="bg-orange-400 hover:bg-orange-500 cursor-pointer">Confirm Action</Button>
              <Button variant={"ghost"} className=" hover:bg-orange-500 cursor-pointer">Cancel</Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Customer History */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Customer History
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <p>Total Requests</p>
                <p className="font-medium">5</p>
              </div>
              <div className="flex justify-between">
                <p>Approved Refunds</p>
                <p className="font-medium">3</p>
              </div>
              <div className="flex justify-between">
                <p>Average Response Time</p>
                <p className="font-medium">2.4 days</p>
              </div>
            </div>
          </div>

          {/* Professional Rating */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Professional Rating
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <p>Overall Rating</p>
                <p className="flex items-center font-medium">
                  4.8 <FaStar className="ml-1 size-4 text-yellow-400" />
                </p>
              </div>
              <div className="flex justify-between">
                <p>Response Rate</p>
                <p className="font-medium">98%</p>
              </div>
              <div className="flex justify-between">
                <p>On-time Completion</p>
                <p className="font-medium">95%</p>
              </div>
            </div>
          </div>

          {/* Similar Cases */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Similar Cases
            </h3>
            <div className="space-y-4">
              {/* Case 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">RF-2024-0120</p>
                  <p className="text-sm text-gray-600">$149.99</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  Approved
                </span>
              </div>
              {/* Case 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">RF-2024-0120</p>
                  <p className="text-sm text-gray-600">$149.99</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  Pending
                </span>
              </div>
              {/* Case 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">RF-2024-0120</p>
                  <p className="text-sm text-gray-600">$149.99</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Request;
