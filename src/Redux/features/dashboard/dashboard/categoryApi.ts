import { baseApi } from "@/Redux/api/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    // POST a new category
    addCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/categories",
        method: "POST",
        body: formData, // send as multipart/form-data
      }),
      invalidatesTags: ["Categories"], // refetch categories after adding
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoriesApi;
