import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: "user",

    initialState: {

        userid: null
    },
    reducers: {

        setUserid: (state, action) => {

            state.userid = action.payload;
        }
    }
});

export const { setUserid } = userSlice.actions;

export default userSlice.reducer;
