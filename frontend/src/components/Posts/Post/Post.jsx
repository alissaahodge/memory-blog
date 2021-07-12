import React, {useState} from 'react';
import useStyles from './styles';
import {Card, CardContent, Typography, CardActions, CardMedia, Button, Menu, MenuItem} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcone from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenuOpen = (event) => {
        setOpenMenu(!openMenu);
        if (openMenu === false) {
            setAnchorEl(event.currentTarget);
        }

    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    return <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography body="body2"> {new Date(post.createdAt).toDateString()}</Typography>
        </div>
        <div className={classes.overlay2} align="right">
            <Button style={{color: 'white'}} size="small" onClick={handleMenuOpen}>
                <MoreHorizIcone fontSize="medium"/>
            </Button>

            <Menu
                id="simple-menu"
                keepMounted
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    setCurrentId(post._id);
                    handleMenuOpen();
                }}>Edit</MenuItem>
            </Menu>

        </div>
        <div className={classes.details}>
            <Typography body="body2" color="textSecondary"> {post.tags.map((tag) => `# ${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom> {post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size="small" onClick={() => {
                dispatch(likePost(post._id))
            }} color="primary">
                <ThumbUpAltIcon fontSize="small"/>&nbsp;
                Like&nbsp; {post.likeCount}</Button>
            <Button size="small" onClick={() => dispatch(deletePost(post._id))} color="primary">
                <DeleteIcon fontSize="small"/>&nbsp;
                Remove</Button>

        </CardActions>

    </Card>
};
export default Post;
