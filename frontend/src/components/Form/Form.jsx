import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CloseIcon from '@material-ui/icons/Close';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from "react-redux";
import {createPosts, updatePost} from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({tags: '', title: '', message: '', selectedFile: ''});
    const [expanded, setExpanded] = useState(false);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    useEffect(() => {
        if (post) {
            setPostData(post)
        }
        if (currentId) {
            setExpanded(true);
        }
    }, [post, currentId]);

    const handleAccordianExpansion = () => {
        setExpanded(!expanded);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0 || currentId == null) {
            dispatch(createPosts({...postData, name: `${user?.result?.firstName} ${user?.result?.lastName}`}));
        } else {
            dispatch(updatePost(currentId, {
                ...postData,
                name: `${user?.result?.firstName} ${user?.result?.lastName}`
            }));
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({tags: '', title: '', message: '', selectedFile: ''});
        setExpanded(false);

    };
if(!user?.result?.firstName && !user?.result?.lastName){
return(<Paper className={classes.paper}>
    <Typography variant="h6" align="center"> Please Sign In To Create Your Own Memories and Like Other Memories.</Typography>
</Paper>);
}
    return <Accordion expanded={expanded}>
        <AccordionSummary
            aria-controls="panel1c-content"
            id="panel1c-header"
        >{expanded === false &&
        <Button className={classes.buttonSubmit} color="primary" variant="contained" size="large"
                fullWidth onClick={handleAccordianExpansion}>Create Blog Post</Button>}

            {expanded === true && <Button align="right" className={classes.buttonClose}
                                          onClick={handleAccordianExpansion}><CloseIcon/></Button>}</AccordionSummary>
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} Your Blog Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Description" fullWidth multiline rows={4}
                           value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <FileBase type="file" multiple={false}
                          onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
            </form>
            <br/>
            <Button className={classes.buttonSubmit} color="primary" variant="contained" size="large" type="submit"
                    fullWidth onClick={handleSubmit}>Submit</Button>
            <Button className={classes.buttonSubmit} color="secondary" variant="contained" size="small"
                    type="submit"
                    fullWidth onClick={clear}>Clear</Button>
        </Paper></Accordion>
};
export default Form;
