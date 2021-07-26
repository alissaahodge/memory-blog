import {AUTH} from "../../constants/actionTypes";
import * as api from '../api';
import CustomizedSnackbars from "../../components/Shared/SnackBar/SnackBar";
import {Paper} from '@material-ui/core/';
import ReactDOM from "react-dom";

export const signin = (formData, history) => async (dispatch) => {
    try {
//log in the user
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});
        history.push('/')
    } catch (e) {
        console.log(e);
        return (
            ReactDOM.render((
                <Paper elevation={6}>
                    <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error"
                                         message={e.response.data.message} open_={true}/>
                </Paper>
            ), document.getElementById('alert'))
        );
    }
};


export const signup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data});
                history.push('/');

                return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="success" message={'Registration Successful!'} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );

    } catch (e) {
        console.log(e);
        return (
            ReactDOM.render((
                <Paper elevation={6}>
                    <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error"
                                         message={e.response.data.message} open_={true}/>
                </Paper>
            ), document.getElementById('alert'))
        );

    }
};
