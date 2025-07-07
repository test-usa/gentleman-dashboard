
import { baseApi } from "@/Redux/api/baseApi";

const getUpCommingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUpComming: builder.query({
      query: () => ({
        url: "/bookings/allBooking",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUpCommingQuery } = getUpCommingApi

