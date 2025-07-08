import { baseApi } from "@/Redux/api/baseApi";

const getServiceListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getServiceListing: builder.query({
      query: () => ({
        url: "/users/providers",
        method: "GET",
      }),
    }),
  }),
});
export const {useGetServiceListingQuery} = getServiceListingApi