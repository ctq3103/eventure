import { SIGN_IN_USER, SIGN_OUT_USER } from "./auth.types"

const INITIAL_STATE = {
    authenticated: false,
    currentUser: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return {
                authenticated: true,
                currentUser: action.payload.creds
            }
        case SIGN_OUT_USER:
            return {
                authenticated: false,
                currentUser: null
            }
        default:
            return state
    }
}