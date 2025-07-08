
import { baseApi } from "@/Redux/api/baseApi";

const getMonthlyStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyStatus: builder.query({
      query: () => ({
        url: "/metadata/stats/monthly",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetMonthlyStatusQuery } =  getMonthlyStatusApi

