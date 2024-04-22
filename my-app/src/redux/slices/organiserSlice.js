import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    organiserToken: null,
    organiserData: null,
};

const organiserSlice = createSlice({
    name: 'organiserSlice',
    initialState,
    reducers: {
        logOut: state => {
            state.organiserToken = null;
            state.organiserData = null;
        },
        updateOrganiser: (state, action) => {
            state.organiserToken = action.payload.organiserToken;
            state.organiserData = action.payload.organiserData;
        }
    },
});

export default organiserSlice.reducer;

export const { logOut, updateOrganiser } = organiserSlice.actions;
