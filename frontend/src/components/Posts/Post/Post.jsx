import React, {useState} from 'react';
import useStyles from './styles';
import {Card, CardContent, Typography, CardActions, CardMedia, Button, Menu, MenuItem} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
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
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon
                        fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined
                        fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
    };


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
            <Typography variant="h6">{post.name}</Typography>
            <Typography body="body2"> {new Date(post.createdAt).toDateString()}</Typography>
        </div>
                   {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <div className={classes.overlay2} align="right">
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

        </div> }
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
            }} color="primary"
                    disabled={!user?.result}>
                <Likes/>
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            <Button size="small" onClick={() => dispatch(deletePost(post._id))} color="primary">
                <DeleteIcon fontSize="small"/>&nbsp;
                Remove</Button>}


        </CardActions>

    </Card>
};
export default Post;
