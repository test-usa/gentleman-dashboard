// // src/Redux/features/auth/authSlice.ts
// import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "@/Redux/store";

// type TAuthState = {
//   user: null | object;
//   token: null | string;
// };

// const initialState: TAuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.token = token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;



import type { RootState } from "@/Redux/store";
import { createSlice } from "@reduxjs/toolkit";


 export type TUser={
   userId:string
   role:string
   iat:number
   exp:number
}

type TAuthState={
   user:null | TUser,
   token:null | string
}

const initialState:TAuthState={
   user:null,
   token:null
            
}

const authSlice=createSlice({
   name:'auth',
   initialState,
   reducers:{
      setUser:(state,action)=>{
         const {user,token}=action.payload
         state.user=user;
         state.token=token

      },
      logOut:(state)=>{
         state.user=null;
         state.token=null;
      }
   }

})

export const{setUser,logOut}=authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken=(state:RootState)=>state.auth.token ;
export const selectCurrentUser=(state:RootState)=>state.auth.user
