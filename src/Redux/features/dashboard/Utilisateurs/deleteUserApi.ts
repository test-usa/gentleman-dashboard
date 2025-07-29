import { baseApi } from "@/Redux/api/baseApi";

const deleteUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (id: string | number) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteUserMutation } = deleteUserApi;
