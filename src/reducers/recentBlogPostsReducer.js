export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BLOG_RECENT_POSTS': return action.payload;
        default: return state;
    }
};