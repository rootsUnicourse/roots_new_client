import * as api from '../api'

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: 'GET_USERS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}