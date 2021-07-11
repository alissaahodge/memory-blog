import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from "react-redux";
import {createPosts, updatePost} from "../../actions/posts";

const Form = (currentId, setCurrentId) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({creator: '', tags: '', title: '', message: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p)=>p._id===currentId):null);

    const dispatch = useDispatch();
    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));

        } else {
            dispatch(createPosts(postData));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({creator: '', tags: '', title: '', message: '', selectedFile: ''})

    };
    return <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} Your Blog Post</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                       onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                       onChange={(e) => setPostData({...postData, title: e.target.value})}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                       onChange={(e) => setPostData({...postData, message: e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                       onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
            <FileBase type="file" multiple={false}
                      onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
        </form>

        <Button className={classes.buttonSubmit} color="primary" variant="contained" size="large" type="submit"
                fullWidth>Submit</Button>
        <Button className={classes.buttonSubmit} color="secondary" variant="contained" size="small" type="submit"
                fullWidth onClick={clear}>Clear</Button>
    </Paper>
};
export default Form;
