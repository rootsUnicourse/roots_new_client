import { AUTH,ERROR } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const googleLogin = (googleData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.googleLogin(googleData)
        dispatch({ type: AUTH, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        const error = null;
        dispatch({ type: ERROR, error })
        navigate('/')
    } catch (error) {
        dispatch({ type: ERROR, error })
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(formData)
        console.log('data :', data);
        dispatch({ type: AUTH, data })
        navigate('/avatarCreation')

    } catch (error) {
        console.log(error)
    }
}