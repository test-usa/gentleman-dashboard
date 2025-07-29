import { baseApi } from "@/Redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (formData) => ({
        url: "/services",
        method: "POST",
        body: formData,  
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const { useAddServiceMutation } = servicesApi;
