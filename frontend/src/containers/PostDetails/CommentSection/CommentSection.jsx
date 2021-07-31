import React, {useState, useRef, useEffect} from 'react';
import {Typography, TextField, Button, Grid, CardActions} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";

import {createPostComment, deletePostComment} from '../../../store/actions/posts';
import useStyles from '../styles';
import ConfirmDialog from "../../../components/Shared/ConfirmDialog/ConfirmDialog";

const CommentSection = ({post}) => {
    const initialState = {name: '', body: '', postId: post._id};
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState(initialState);
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));


    const handleSubmitComment = async () => {
       await dispatch(createPostComment({
            ...comment,
            name: `${user?.result?.firstName || user?.result?.givenName} ${user?.result?.lastName || user?.result?.familyName}`
        }, post._id));
        // setComment(initialState);

        // if (commentsRef) commentsRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    const handleRemoveComment = async (id) => {
        dispatch(deletePostComment(id));
    };

    return (<div>
        <div className={classes.commentsOuterContainer}>

            <div className={classes.commentsInnerContainer}>
                {comments?.length > 0 && <Typography gutterBottom variant="h6">Comments</Typography>}
                {comments?.map((c, i) => (
                    <Grid container spacing={1} key={i}><Typography gutterBottom variant="subtitle1">
                        <strong> {c.name}</strong>:&nbsp;  {c.body}
                    </Typography>&nbsp;
                        {(user?.result?.googleId === c?.creator || user?.result?._id === c?.creator) &&
                        <ConfirmDialog
                            dialogText="Are You Sure You Want to Remove This Comment?"
                            okBtnText="Yes" cancelBtnTxt="No" openState={false}
                            color="primary" size="small"
                            removeFunction={() => handleRemoveComment(c._id)} id={c._id}
                            dialogBtnTxt={<><DeleteIcon fontSize="small"/></>}/>}
                    </Grid>
                ))}
                <div ref={commentsRef}/>
                {comments?.length < 1 ? <div><br/><br/><br/><br/><br/></div> : <div><br/><br/><br/></div>}
            </div>
            {user?.result?.email &&
            <div style={{width: '70%'}}>
                <Typography gutterBottom variant="h6">Leave a Comment</Typography>
                <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment.body}
                           onChange={(e) => setComment({...comment, body: e.target.value})}/>
                <Button style={{marginTop: '10px', color: 'white'}} fullWidth disabled={!comment} variant="contained"
                        onClick={handleSubmitComment} color="primary">Comment</Button>
            </div>}
        </div>
    </div>);
};

export default CommentSection;
