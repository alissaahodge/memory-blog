import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import useStyles from './styles';
import {useDispatch} from "react-redux";

import {getPosts} from './actions/posts';
import memory from './assets/images/72.jpg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return <Container maxWidth="lg">
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <Typography variant="h2" align="center" className={classes.heading}>Memory Blog</Typography>
            {/*<img src={memories} alt="memories" height="60" className={classes.image}/>*/}
            <img src={memory} alt="memories" height="60" className={classes.image}/>
        </AppBar>
        <Grow in><Container><Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing="3">
            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
        </Grid></Container></Grow>
    </Container>
};
export default App;
