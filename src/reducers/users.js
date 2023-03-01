export default (users = [], action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.payload;
        case 'GET_CHILDREN':
            return action.payload;
        default:
            return users;
    }
}