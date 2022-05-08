import { createSlice } from "@reduxjs/toolkit"


export const sendNotification = payload => ({ type: "notifications/newNotifications", payload })

export const removeNotif = () => ({ type: "notifications/removeNotifications" })


const notifSlice = createSlice({
    name: "notifications",
    initialState: "",
    reducers: {
        newNotifications(state, action) {
            console.log("testing notification state", state)
            return state = action.payload
        },
        removeNotifications() {
            return false
        }
    }
})

export const { newNotification, initialState } = notifSlice.actions
export default notifSlice.reducer