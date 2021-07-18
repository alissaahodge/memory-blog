import React, {useEffect, useState} from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from "@material-ui/core";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

import {getPosts, getPostsBySearch} from "../../actions/posts";
import Pagination from '../Shared/Pagination/Pagination';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import TagsInput from "../Shared/UI/TagsInput/TagsInput";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    };
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
            //search for post
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    return (<Grow in>

        <Container maxWidth="xl"><Grid container className={classes.gridContainer} justifyContent="space-between"
                                       alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField name="search" variant="outlined" placeholder="Search Memories" fullWidth value={search}
                               onKeyPress={handleKeyPress}
                               onChange={(e) => {
                                   setSearch(e.target.value)
                               }}/>
                    <br/>
                    <TagsInput
                        tags={tags}
                        handleRemove={handleDelete}
                        handleAdd={handleAdd}
                        setTags={setTags}
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="Search Tags"
                    /><br/>
                    <Button onClick={searchPost} variant="contained" className={classes.searchButton}
                            color="primary"> Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>

                {(!searchQuery && !tags.length) &&
                <Paper className={classes.pagination} elevation={6}><Pagination page={page}/></Paper>}
            </Grid>
        </Grid></Container></Grow>);
};
export default Home;
