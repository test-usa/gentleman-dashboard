import { baseApi } from "@/Redux/api/baseApi";

const getServiceListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getServiceListing: builder.query({
      query: (currentPage) => ({
        url: `/users/providers?page=${currentPage}`,
        method: "GET",
      }),
    }),
  }),
});
export const {useGetServiceListingQuery} = getServiceListingApi