import React from 'react';
import useStyles from './styles';
import {Card, CardContent, Typography, CardActions, CardMedia, Button} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcone from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
            <Typography variant="h6"> Post Creator</Typography>
            <Typography body="body2"> {moment(post.createdAt)}</Typography>
        </div>
        <div className={classes.overlay2}>
            <Button style={{color: 'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
                <MoreHorizIcone fontSize="default"/>
            </Button>
        </div>
        <div className={classes.details}>
            <Typography body="body2" color="textSecondary"> {post.tags.map((tag) => `# ${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom> {post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size="small" onClick={()=>{dispatch(likePost(post._id))}} color="primary">
                <ThumbUpAltIcon fontSize="small"/>&nbsp;
            Like&nbsp; {post.likeCount}</Button>
            <Button size="small" onClick={()=>dispatch(deletePost(post._id))} color="primary">
                <DeleteIcon fontSize="small"/>
            Remove</Button>

        </CardActions>

    </Card>
};
export default Post;