import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import useStyles from "./styles";
import {Avatar, Button, Paper, TextField, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from "react-google-login";
import Icon from './Icon';
import Input from './Input';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = () => {

    };
    const handleChange = () => {

    };
    const switchMode = () => {
        setIsSignup(!isSignup);
        handleShowPassword(false);
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);

    };

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch(({type: 'AUTH', data: {result, token}}));
            history.push('/')
        } catch (error) {
            console.log(error)
        }

    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign in Was Unsuccessful. Try again Later.')

    };
    return (<Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : ' Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (<>

                                <Input name="firstName" label="First Name" handleChange={handleChange} autofocus
                                       half/>
                                <Input name="lastName" label="Last Name"
                                       handleChange={handleChange} half/>
                            </>)
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                            type="password"/>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" className={classes.submit} color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId="GOOGLE ID" render={(renderProps) => (<Button className={classes.googleButton}
                                                                                        fullWidth
                                                                                        onClick={renderProps.onClick}
                                                                                        disabled={renderProps.disabled}
                                                                                        startIcon={<Icon/>}
                                                                                        variant="contained"> Google Sign
                        In
                    </Button>)}
                                 onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button className={classes.switchButton}
                                    onClick={switchMode}>{isSignup ? 'Already Have an Account?' : 'Dont Have An Account? Sign up'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};
export default Auth;
