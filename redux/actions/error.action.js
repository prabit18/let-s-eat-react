import {errorActions} from './actionType';
export const setErrors = (error) => ({
    type: errorActions.SET_ERROR,
    error
})

export const resetErrors = () => ({
    type: errorActions.RESET_ERROR
})
