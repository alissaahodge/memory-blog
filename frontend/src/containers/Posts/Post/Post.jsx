import React, {useState} from 'react';
import useStyles from './styles';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    CardMedia,
    Button,
    Menu,
    MenuItem,
    ButtonBase
} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcone from '@material-ui/icons/MoreHoriz';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../store/actions/posts";
import ConfirmDialog from '../../Shared/ConfirmDialog/ConfirmDialog';
import dummyFile from "../../../assets/images/dummy-file.png";
import {useHistory} from 'react-router-dom';

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);
    const Likes = () => {
        if (likes.length > 0) {
            return hasLikedPost
                ? (
                    <><ThumbUpAltIcon
                        fontSize="small"/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined
                        fontSize="small"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
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

    const handleLike = () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return <Card className={classes.card} raised elevation={6}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
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

        </div>}
        <ButtonBase className={classes.cardAction} onClick={openPost}>
            <CardMedia className={classes.media} image={post.selectedFile || dummyFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography body="body2"> {new Date(post.createdAt).toDateString()}</Typography>
            </div>


            <div className={classes.details}>
                <Typography body="body2" color="textSecondary"> {post.tags.map((tag) => `# ${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p"
                            gutterBottom> {post.message}</Typography>
            </CardContent></ButtonBase>
        <CardActions className={classes.cardActions}>
            <Button size="small" onClick={handleLike} color="primary"
                    disabled={!user?.result}>
                <Likes/>
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&

            <ConfirmDialog
                dialogText="Are You Sure You Want to Remove This?"
                okBtnText="Yes" cancelBtnTxt="No" openState={false}
                color="primary" size="small"
                removeFunction={() => dispatch(deletePost(post._id))} id={post._id}
                dialogBtnTxt={<><DeleteIcon fontSize="small"/>&nbsp;Remove</>}/>
            }


        </CardActions>

    </Card>
};
export default Post;
