import { createSlice } from "@reduxjs/toolkit"

export const updateFilter = payload => ({ type: "filter/changeFilter", payload })

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        changeFilter(state, action) {
            console.log("filter state", state)
            return state = action.payload
        }

    }
})

export default filterSlice.reducer