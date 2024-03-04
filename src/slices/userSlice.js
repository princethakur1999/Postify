import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: "user",

    initialState: {

        isLoading: false,
        isFetching: false,
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        user: null
    },

    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload; // Corrected typo here
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setIsLoading, setIsFetching, setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
