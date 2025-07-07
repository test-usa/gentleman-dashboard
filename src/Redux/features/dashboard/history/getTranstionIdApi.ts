
import { baseApi } from "@/Redux/api/baseApi";

const getTranstionIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTranstionId: builder.query({
      query: () => ({
        url: "/payments/all",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetTranstionIdQuery } = getTranstionIdApi

