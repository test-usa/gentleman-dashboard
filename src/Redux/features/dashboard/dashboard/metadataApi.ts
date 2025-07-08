
import { baseApi } from "@/Redux/api/baseApi";

const getMetaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => ({
        url: "/metadata/metrics",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetMetaDataQuery } =  getMetaDataApi

