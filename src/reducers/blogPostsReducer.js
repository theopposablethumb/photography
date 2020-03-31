export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BLOG_POSTS': return action.payload;
        default: return state;
    }
};