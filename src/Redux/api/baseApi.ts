// // src/Redux/api/baseApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://gentleman-backend-2.onrender.com/api/v1",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       console.log(token)
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: [],
//   endpoints: () => ({}),
// });



import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { setUser } from "../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery=fetchBaseQuery({baseUrl:'https://freepik.softvenceomega.com/gntl/v1',

            // credentials:'include',
            prepareHeaders: (headers, { getState }) => {
                        const token = (getState() as RootState).auth.token;

                        if(token){
                                    headers.set('authorization',`${token}`)
                        }
                    return headers;
              }
                    
})


const baseQueryWithRefreshToken:BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType>=async(args, api,extraOptions):Promise<any>=>{
            let result= await baseQuery(args, api,extraOptions)

            if (result?.error?.status === 401) {
                console.log("sending refresh token");
        
                const res = await fetch("https://freepik.softvenceomega.com/gntl/v1/auth/refresh-token", {
                    method: "POST",
                    credentials: "include",
                });
                const data=await res.json()
                console.log(data);
        

                const user=(api.getState() as RootState).auth.user

                api.dispatch(
                    setUser({
                        user,
                        token:data.data.accessToken
                    })
                )
                result = await baseQuery(args, api, extraOptions);
            }
            return result;
            
}

export const baseApi=createApi({
            reducerPath:'baseApi',
            baseQuery:baseQueryWithRefreshToken,

            endpoints:()=>({})
            

})
