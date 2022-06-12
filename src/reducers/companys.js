export default (companys = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...companys, action.payload];
        case 'FETCH_BY_SEARCH':
            return action.payload;
        default:
            return companys;
    }
}