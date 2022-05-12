import { createSlice } from "@reduxjs/toolkit"



export const sendNotification = payload => ({ type: "notifications/newNotifications", payload })

export const removeNotif = () => ({ type: "notifications/removeNotifications" })

let notifTimer

export const setNotification = (payload, time) => {
    return async dispatch => {
        clearNotif()
        dispatch(sendNotification(payload))
        notifTimer = setTimeout(() => {
            dispatch(removeNotif())
        }, time * 1000)

    }

}

const clearNotif = () => {
    clearTimeout(notifTimer)
}

const notifSlice = createSlice({
    name: "notifications",
    initialState: "",
    reducers: {
        newNotifications(state, action) {
            console.log("notification state", action)
            return state = action.payload
        },
        removeNotifications() {
            return false
        }
    }
})

export const { newNotification, initialState } = notifSlice.actions
export default notifSlice.reducer