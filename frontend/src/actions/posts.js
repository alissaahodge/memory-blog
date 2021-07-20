import {
    FETCH_ALL,
    FETCH_POST,
    CREATE,
    UPDATE,
    DELETE,
    LIKE_POST,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    COMMENT_POST
} from "../constants/actionTypes";
import * as api from '../api';

// Action Creators

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message);
    }
};


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: {...data}});
        dispatch({type: END_LOADING});

    } catch (e) {
        console.log(e);
    }
};

export const createPosts = (post, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);
        history.push(`/posts/${data._id}`);

        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
};
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        return dispatch({type: UPDATE, payload: data});

    } catch (error) {
        console.log(error.message)
    }
};


export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})

    } catch (error) {
        console.log(error.message)
    }
};
export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        return dispatch({type: LIKE_POST, payload: data});

    } catch (error) {
        console.log(error.message)
    }
};
export const commentPost = (value, id) => async (dispatch) => {
    try {
         const {data} = await api.commentPost(value, id);
         dispatch({type: COMMENT_POST, payload: data});
         return data.comments;

    } catch (error) {
        console.log(error.message)
    }
};
