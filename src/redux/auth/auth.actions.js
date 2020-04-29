import { SIGN_IN_USER, SIGN_OUT_USER } from "./auth.types"

export const signIn = (creds) => {
    return {
        type: SIGN_IN_USER,
        payload: {
            creds
        }
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT_USER
    }
}