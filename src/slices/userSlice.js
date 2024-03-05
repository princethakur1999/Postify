import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: "user",

    initialState: {

        isLoading: false,
        isFetching: false,
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        userDetails: null
    },

    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
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

export const { setIsLoading, setIsFetching, setToken, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
