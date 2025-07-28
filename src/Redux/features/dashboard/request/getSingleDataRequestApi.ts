import { baseApi } from "@/Redux/api/baseApi";

const getSingleDataRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleDataRequest: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,  
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleDataRequestQuery } = getSingleDataRequestApi;
