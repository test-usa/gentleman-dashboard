import { baseApi } from "../../api/baseApi";

const registerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (adminInfo) => ({
                url : '/auth/admin-register',
                method: 'POST',
                body : adminInfo
            })
        })
    }),
})

export const {useRegisterMutation} = registerApi;