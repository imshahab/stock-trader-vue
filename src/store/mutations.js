export const skipDay = (state) => {
    state.skippedDays++
}

export const resetSkippedDays = (state) => {
    state.skippedDays = 0
}

export const updateSkippedDays = (state, skippedDays) => {
    state.skippedDays = skippedDays
}

export const setUser = (state, userEmail) => {
    state.isLoggedIn = true
    state.userEmail = userEmail
}
