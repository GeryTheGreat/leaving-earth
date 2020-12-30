export const addRoute = (route) => ({
    type: 'ADD_ROUTE',
    payload: route
})

export const removeRoute = (i) => ({
    type: 'REMOVE_ROUTE',
    payload: i
})

export const aeroBrakeToggle = (i) => ({
    type: 'AEROBRAKE_TOGGLE',
    payload: i
})

export const changeMass = (mass, i) => ({
    type: 'CHANGE_MASS',
    payload: { mass, i }
})

export const changeYears = (years, i) => ({
    type: 'CHANGE_YEARS',
    payload: { years, i }
})

export const changeRocket = (count, i, rocket) => ({
    type: 'CHANGE_ROCKET',
    payload: { count, i, rocket }
})

export const changeIon = (count) => ({
    type: 'CHANGE_ION',
    payload: count
})

export const useRocket = (rocket, i) => ({
    type: 'USE_ROCKET',
    payload: { rocket, i }
})

export const removeRocket = (rocket, i) => ({
    type: 'REMOVE_ROCKET',
    payload: { rocket, i }
})
