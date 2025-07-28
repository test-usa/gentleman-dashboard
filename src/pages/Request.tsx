import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Request = () => {
  const [action, setAction] = useState("");
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [refundSubmitted, setRefundSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted ID:", id);
    console.log("Reason:", reason);
    // 👉 Refund API call can go here
    // After successful submission, mark refund as submitted.
    if (action === "refund") {
      setRefundSubmitted(true);
    }
  };

  const handleConfirm = () => {
    if (action === "nonrefund") {
      console.log("Non-refund Confirmed");
      // 👉 Non-refund API call
    } else if (action === "refund" && refundSubmitted) {
      console.log("Refund Confirmed with ID:", id);
      // 👉 Optional: Refund confirmation logic
    } else {
      console.log("Refund selected but form is not submitted yet");
    }
  };

  // Whenever the action changes, reset the refundSubmitted state
  useEffect(() => {
    if (action !== "refund") {
      setRefundSubmitted(false);
    }
  }, [action]);

  return (
    <div>
      <div className="h-full bg-gray-50 p-6 font-sans">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Request Management
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 space-y-6">
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
                <p className="text-2xl font-bold text-gray-800">$249.99</p>
              </div>
            </div>

            {/* Action Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">
                Select Action
              </h3>
              <div className="relative">
                <form onSubmit={handleSubmit} className="mx-auto">
                  <select
                    className="block w-full mb-4 appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  >
                    <option value="">Select an action</option>
                    <option value="refund">Refund</option>
                    <option value="nonrefund">Non-Refund</option>
                  </select>

                  {action === "refund" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter ID"
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Enter reason (optional)"
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </form>
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
                <Button
                  className={`${
                    (action === "refund" && !refundSubmitted)
                      ? "bg-orange-300 cursor-not-allowed"
                      : "bg-orange-400 hover:bg-orange-500 cursor-pointer"
                  } text-white px-4 py-2 rounded-md transition`}
                  onClick={handleConfirm}
                  disabled={action === "refund" && !refundSubmitted}
                >
                  Confirm Action
                </Button>
                <Button
                  variant={"ghost"}
                  className="hover:bg-orange-500 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            <div className="rounded-lg border h-full border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">
                Similar Cases
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">RF-2024-0120</p>
                    <p className="text-sm text-gray-600">$149.99</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    Approved
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">RF-2024-0121</p>
                    <p className="text-sm text-gray-600">$179.99</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                    Pending
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">RF-2024-0122</p>
                    <p className="text-sm text-gray-600">$199.99</p>
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
    </div>
  );
};

export default Request;
