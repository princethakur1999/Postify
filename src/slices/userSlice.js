import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: "user",

    initialState: {

        isFetching: false,
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        userDetails: null
    },

    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        }
    }
});

export const { setIsFetching, setToken, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
