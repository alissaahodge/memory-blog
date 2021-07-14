import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Container, Typography, Button, Avatar, Toolbar} from "@material-ui/core";
import memory from "../../assets/images/72.jpg";
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    useEffect(() => {
        const token = user?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    };
    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' variant="h2" align="center" className={classes.heading}>Memory
                    Blog</Typography>
                <img src={memory} alt="memories" height="60" className={classes.image}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                        <div className={classes.profile}><Avatar className={classes.pink} alt={user.result.name}
                                                                 src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logOut} color="secondary"
                                    onClick={logout}>Logout</Button>
                        </div>) :
                    (<div><Button className={classes.signIn} component={Link} to="/auth" variant="contained"
                                  color="primary">Sign In</Button></div>)}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
