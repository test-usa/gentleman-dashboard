import { Button } from "@/components/ui/button";
import { useGetAllSimillerCaseQuery } from "@/Redux/features/dashboard/request/getAllSimillerCaseApi";
import { useGetSingleDataRequestQuery } from "@/Redux/features/dashboard/request/getSingleDataRequestApi";
import { usePatchSingleDataRequestMutation } from "@/Redux/features/dashboard/request/patchSingleDataRequestApi";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface RefundResponse {
  success: boolean;
  message?: string;
}

const Request = () => {
  const [action, setAction] = useState("");
  const [id, setId] = useState("");
  const [refundSubmitted, setRefundSubmitted] = useState(false);
  const [note, setNote] = useState("");

  const { data: allCases } = useGetAllSimillerCaseQuery(undefined);
  const { data: singleData } = useGetSingleDataRequestQuery(id);
  const [patchSingleDataRequest] = usePatchSingleDataRequestMutation();

  console.log(singleData)

  useEffect(() => {
    if (allCases?.data?.data?.length > 0 && !id) {
      setId(allCases.data.data[0].id);
    }
  }, [allCases, id]);

  useEffect(() => {
    if (action !== "refund") {
      setRefundSubmitted(false);
    }
  }, [action]);

  const simulateRefundSubmission = async (): Promise<RefundResponse> => {
    return {
      success: true,
      message: "Remboursement effectué",
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "refund") {
      const res: RefundResponse = await simulateRefundSubmission();
      if (res.success) {
        setRefundSubmitted(true);
      }
    }
  };

  const handleConfirm = async () => {
    if (!id) return;

    if (action === "nonrefund" || (action === "refund" && refundSubmitted)) {
      const body = {
        note: note || "Le problème a été examiné et traité",
        status:
          singleData?.data?.status === "PENDING"
            ? "APPROVED"
            : singleData?.data?.status,
        refundStatus: action === "refund" ? "REFUNDED" : "NOT_REFUNDED",
      };

      try {
        await patchSingleDataRequest({ id, body }).unwrap();
        console.log("Mise à jour réussie");
      } catch (error) {
        console.error("Échec de la mise à jour", error);
      }
    }
  };

  const user = singleData?.data?.booking?.user;
  const provider = singleData?.data?.booking?.provider;

  return (
    <div className="h-full bg-gray-50 p-6 font-sans">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Gestion des Demandes
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-800">
                Demande #
                {singleData?.data?.updatedAt
                  ? `RF-${format(
                      new Date(singleData.data.updatedAt),
                      "yyyy-MM-dd"
                    )}`
                  : "RF-2024-01-23"}
              </h2>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                {singleData?.data?.status || "En attente de révision"}
              </span>
            </div>

            <p className="mb-6 text-sm text-gray-500">
              Soumis le{" "}
              {singleData?.data?.updatedAt
                ? format(
                    new Date(singleData.data.updatedAt),
                    "dd MMM yyyy 'à' HH:mm"
                  )
                : "23 Janvier 2024 à 10:45"}
            </p>

            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="text-base font-semibold text-gray-800">
                  {user?.name || "Sarah Johnson"}
                </p>
                <p className="text-sm text-gray-500">
                  ID: {user?.id || "CUS-789012"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Professionnel</p>
                <p className="text-base font-semibold text-gray-800">
                  {provider?.name || "Michael Brown"}
                </p>
                <p className="text-sm text-gray-500">
                  ID: {provider?.id || "PRO-345678"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Montant demandé</p>
              <p className="text-2xl font-bold text-gray-800">
                ${singleData?.data?.requestedAmount || "249.99"}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Sélectionner une action
            </h3>
            <form onSubmit={handleSubmit}>
              <select
                className="block w-full mb-4 appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option value="">Choisir une action</option>
                <option value="refund">Remboursement</option>
                <option value="nonrefund">Pas de remboursement</option>
              </select>

              {action === "refund" && (
                <>
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 bg-gray-50">
                      <p className="font-semibold text-gray-700">Client</p>
                      <p>Nom: {user?.name || "N/A"}</p>
                      <p>Email: {user?.email || "N/A"}</p>
                      <p>Solde: {user?.balance || "N/A"}</p>
                      <p>Téléphone: {user?.phone || "N/A"}</p>
                      <p>Adresse: {user?.address || "N/A"}</p>
                    </div>
                    <div className="border rounded-md p-3 bg-gray-50">
                      <p className="font-semibold text-gray-700">
                        Prestataire
                      </p>
                      <p>Nom: {provider?.name || "N/A"}</p>
                      <p>Email: {provider?.email || "N/A"}</p>
                      <p>Solde: {provider?.balance || "N/A"}</p>
                      <p>Téléphone: {provider?.phone || "N/A"}</p>
                      <p>Adresse: {provider?.address || "N/A"}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      ID Client
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user?.id || ""}
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      ID Prestataire
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={provider?.id || ""}
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Soumettre
                  </button>
                </>
              )}
            </form>

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                Ajouter une note (optionnel)
              </h3>
              <textarea
                className="block w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                rows={3}
                placeholder="Écrivez votre note ici..."
                maxLength={500}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <p className="text-right text-xs text-gray-400">
                {note.length}/500 caractères
              </p>
            </div>

            <div className="mt-6 flex items-center rounded-md bg-orange-50 p-3 text-orange-700">
              <FaExclamationTriangle className="mr-2 size-5" />
              <p className="text-sm">
                <span className="font-semibold">Aperçu de l'action</span>
                <br />
                Sélectionnez une action pour voir l'aperçu et son impact.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                className={`${
                  action === "refund" && !refundSubmitted
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-400 hover:bg-orange-500 cursor-pointer"
                } text-white px-4 py-2 rounded-md transition`}
                onClick={handleConfirm}
                disabled={action === "refund" && !refundSubmitted}
              >
                Confirmer l'action
              </Button>
              <Button
                variant={"ghost"}
                className="hover:bg-orange-500 cursor-pointer"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="rounded-lg border h-full border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Cas Similaires
            </h3>
            {allCases?.data?.data?.map(
              (
                item: {
                  id: string;
                  updatedAt?: string;
                  requestedAmount?: string;
                  status?: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                  onClick={() => setId(item.id)}
                  className={`my-4 cursor-pointer hover:bg-gray-100 p-3 rounded transition ${
                    id === item.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.updatedAt
                          ? `RF-${format(
                              new Date(item.updatedAt),
                              "yyyy-MM-dd"
                            )}`
                          : "RF-2024-01-20"}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.requestedAmount ?? "149.99"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status ?? "En attente"}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
