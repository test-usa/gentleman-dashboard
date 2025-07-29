import { baseApi } from "@/Redux/api/baseApi";

const updateUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, data }: { id: string | number; data: Partial<any> }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = updateUserApi;
