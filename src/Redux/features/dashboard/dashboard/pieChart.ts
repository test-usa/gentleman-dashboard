
import { baseApi } from "@/Redux/api/baseApi";

const getPiChartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPiChart: builder.query({
      query: () => ({
        url: "/dashboard/chart/service-distribution",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetPiChartQuery } = getPiChartApi 

