import React from 'react';
import {Grid, CircularProgress} from "@material-ui/core";
import {useSelector} from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    const classes = useStyles();

    return !posts.length ?
        <Grid container className={classes.progressBar}><Grid item><CircularProgress /></Grid></Grid> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} xs={12} sm={6} item><Post post={post} setCurrentId={setCurrentId}/></Grid>))}
            </Grid>
        )
};
export default Posts;
