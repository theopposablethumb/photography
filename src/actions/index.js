import flickr from '../api/flickr';
import tumblr from '../api/tumblr';

const userId = '&user_id=184012765@N08';
const albumsMethod = '&method=flickr.photosets.getList';
const photosMethod = '&method=flickr.photosets.getPhotos';
const photoMethod = '&method=flickr.photos.getInfo';
const sizeMethod = '&method=flickr.photos.getSizes';
const exifMethod = '&method=flickr.photos.getExif';

const tumblrUuuid = 't:7fpz5aTZcOFQW7gnPljs8A';
const postsMethod = '/posts';
const tumblrParams = '&reblog_info=false&notes_info=false';

export const fetchAlbums = () => {
    return async (dispatch) => {    
        const response = await flickr.get(`&${process.env.REACT_APP_FLICKR_API_KEY}${userId}${albumsMethod}&format=json&nojsoncallback=1`);

        dispatch(
            { type: 'FETCH_ALBUMS', 
            payload:  response.data.photosets.photoset }
        )
    }
    
};

export const fetchPhotos = (albumId) => {
    return async (dispatch) => {
        const response = await flickr.get(`&${process.env.REACT_APP_FLICKR_API_KEY}${userId}&photoset_id=${albumId}${photosMethod}&format=json&nojsoncallback=1`);

        dispatch(
            { type: 'FETCH_PHOTOS',
            payload: response.data.photoset }
        )
    }
};

export const fetchPhoto = (photoId) => {
    return async (dispatch) => {
        const response = await flickr.get(`&${process.env.REACT_APP_FLICKR_API_KEY}${userId}&photo_id=${photoId}${photoMethod}&format=json&nojsoncallback=1`);

        dispatch(
            { type: 'FETCH_PHOTO',
            payload: response.data.photo }
        )
    }
};

export const fetchSizes = (photoId) => {
    return async (dispatch) => {
        const response = await flickr.get(`&${process.env.REACT_APP_FLICKR_API_KEY}${userId}&photo_id=${photoId}${sizeMethod}&format=json&nojsoncallback=1`);

        dispatch(
            { type: 'FETCH_SIZES',
            payload: response.data.sizes.size }
        )
    }
};

export const fetchMeta = (photoId) => {
    return async (dispatch) => {
        const response = await flickr.get(`&${process.env.REACT_APP_FLICKR_API_KEY}${userId}&photo_id=${photoId}${exifMethod}&format=json&nojsoncallback=1`);

        dispatch(
            { type: 'FETCH_META',
            payload: response.data.photo }
        )
    }
};

export const fetchBlogPosts = () => {
    return async (dispatch) => {
        const response = await tumblr.get(`/v2/blog/${tumblrUuuid}${postsMethod}?${process.env.REACT_APP_TUMBLR_API_KEY}${tumblrParams}&filter=raw`);

        dispatch(
            { type: 'FETCH_BLOG_POSTS',
            payload: response.data.response.posts }
        )
    }
};

export const fetchBlogPost = (id) => {
    return async (dispatch) => {
        const response = await tumblr.get(`/v2/blog/${tumblrUuuid}${postsMethod}?${process.env.REACT_APP_TUMBLR_API_KEY}${tumblrParams}&${id}&filter=raw`);

        dispatch(
            { type: 'FETCH_BLOG_POST',
            payload: response.data.response.posts[0] }
        )
    }
};