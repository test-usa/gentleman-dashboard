import { baseApi } from "@/Redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (formData) => ({
        url: "/services",
        method: "POST",
        body: formData,  // Pass FormData directly
        // Do NOT set headers here — fetch will set correct multipart/form-data headers automatically
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const { useAddServiceMutation } = servicesApi;
