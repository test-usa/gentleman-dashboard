
import { baseApi } from "@/Redux/api/baseApi";

const getReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (currentPage) => ({
        url: `/reports?page=${currentPage}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetReportsQuery } = getReportsApi

