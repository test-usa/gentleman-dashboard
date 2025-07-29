import { baseApi } from "@/Redux/api/baseApi";

const patchSingleDataRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    patchSingleDataRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reports/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { usePatchSingleDataRequestMutation } = patchSingleDataRequestApi;
