import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const googleLogin = (googleData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.googleLogin(googleData)
        dispatch({ type: AUTH, data})
        navigate('/profile')
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(formData)
        // console.log(data)
        dispatch({ type: AUTH, data })
        navigate('/profile')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(formData)
        // console.log(data)
        dispatch({ type: AUTH, data })
        navigate('/profile')

    } catch (error) {
        console.log(error)
    }
}