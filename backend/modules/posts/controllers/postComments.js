import express from 'express';
import PostComment from "../models/postComment.js";
import mongoose from 'mongoose';

const router = express.Router();


export const getComments = async (req, res) => {
    const {id} = req.params;
    try {
        const postComments = await PostComment.find({postId: Number(id)});


        res.status(200).json(postComments);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


export const createComment = async (req, res) => {
    const postComment = req.body;
    const newPostComment = new PostComment({...postComment, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPostComment.save();
        res.status(201).json(newPostComment);
    } catch (error) {
        res.status(409).json({message: error.message});

    }
};

export const deleteComment = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Comment Not Found');
    await PostComment.findByIdAndRemove(id);
    res.json({message: 'Comment Deleted Successfully!'});
};


export default router;
