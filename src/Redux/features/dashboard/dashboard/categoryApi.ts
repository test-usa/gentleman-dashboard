import { baseApi } from "@/Redux/api/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (formData) => ({
        url: "/categories",
        method: "POST",
        body: formData, // FormData will be sent as-is
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useAddCategoryMutation } = categoriesApi;
