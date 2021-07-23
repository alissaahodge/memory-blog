import React from 'react';
import {Grid, CircularProgress, Card, CardContent, Typography} from "@material-ui/core";
import {useSelector} from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    if (!posts.length && !isLoading) {
        return <Card><CardContent className={classes.cardRoot}><Typography variant="h5" component="h2"
                                                                           color="textSecondary">No
            Posts Found.</Typography></CardContent></Card>
    }
    return isLoading ?
        <Grid container className={classes.progressBar}> <Grid item>
            <CircularProgress/>
        </Grid></Grid> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} xs={12} sm={12} md={6} lg={3} item><Post post={post}
                                                                                  setCurrentId={setCurrentId}/></Grid>))}
            </Grid>
        )
};
export default Posts;
