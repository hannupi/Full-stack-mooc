import { createSlice } from "@reduxjs/toolkit"

const initialState = "test"

const notifSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        newNotification(state, action) {
            state.notifications = action.payload
        }
    }
})

export default notifSlice.reducer