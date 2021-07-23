import mongoose from 'mongoose';

const postCommentSchema = mongoose.Schema({
    body: String,
    postId: String,
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

});

const PostComment = mongoose.model('PostComment', postCommentSchema);

export default PostComment;
