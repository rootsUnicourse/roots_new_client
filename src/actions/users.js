import * as api from '../api'

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: 'GET_USERS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getChildren = (email) => async (dispatch) => {
    try {
        const { data } = await api.getChildren(email);
        dispatch({ type: 'GET_CHILDREN', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}