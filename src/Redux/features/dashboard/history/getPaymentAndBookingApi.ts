
import { baseApi } from "@/Redux/api/baseApi";

const getPaymentAndBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentAndBooking: builder.query({
      query: () => ({
        url: "/dashboard/summary/paymentAndBooking",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetPaymentAndBookingQuery } = getPaymentAndBookingApi

