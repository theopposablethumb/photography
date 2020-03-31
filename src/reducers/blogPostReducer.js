export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_BLOG_POST': return action.payload;
        default: return state;
    }
};