import { baseApi } from "@/Redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all services
    getServices: builder.query({
      query: () => ({ url: "/services", method: "GET" }),
      providesTags: ["Services"],
    }),

    // POST a new service
    addService: builder.mutation({
      query: (formData: FormData) => ({
        url: "/services",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Services"], // refetch after adding
    }),
  }),
});

export const { useGetServicesQuery, useAddServiceMutation } = servicesApi;
