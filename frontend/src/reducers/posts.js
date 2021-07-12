import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST} from "../constants/actionTypes";
import {useSelector} from "react-redux";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL :
            return Object.values(action.payload);
        case CREATE :
            return [...Object.values(posts), action.payload];
        case UPDATE :
            return Object.values(posts).map((post) => post._id === action.payload._id ? action.payload : post);
        case LIKE_POST :
            return Object.values(posts).map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE :
            posts = Object.values(posts).filter((post) => post._id !== action.payload._id);
            return Object.assign({}, posts)
        default:
            return posts;
    }

}
