import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Container, Typography, Button, Avatar, Toolbar} from "@material-ui/core";
import decode from 'jwt-decode'
import memory from "../../assets/images/72.jpg";
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() => {
        const token = user?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
                }
    }, [location]);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    };
    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' variant="h4" align="center" className={classes.heading}>Memory
                    Blog</Typography>
                <img src={memory} alt="memories" height="40" className={classes.image}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                        <div className={classes.profile}><Avatar className={classes.pink} alt={user.result?.firstName || user.result?.givenName}
                                                                 src={user.result.imageUrl}>{user.result.googleId ? user.result?.givenName.charAt(0) : user.result?.firstName.charAt(0)}</Avatar>
                            <Typography className={classes.userName}
                                        variant="h6">{user.result.firstName || user.result?.givenName} {user.result?.lastName || user.result?.familyName}</Typography>
                            <Button variant="contained" className={classes.logOut} color="secondary"
                                    onClick={logout}>Logout</Button>
                        </div>) :
                    (<div className={classes.profile}><Button className={classes.signIn} component={Link} to="/auth" variant="contained"
                                  color="primary">Sign In</Button></div>)}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
