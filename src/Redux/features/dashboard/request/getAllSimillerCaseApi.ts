import { baseApi } from "@/Redux/api/baseApi";

const getAllSimillerCaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSimillerCase: builder.query({
      query: () => ({
        url: "/reports",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllSimillerCaseQuery } = getAllSimillerCaseApi