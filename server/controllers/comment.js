import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req,res,next) => {
    const newComment = new Comment({...req.body, userId: req.user.id});
    try{
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }catch(err)
    {
        next(err);
    }
}
export const deleteComment = async (req,res,next) => {
    try{
        //res
        const commment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if(req.uesr.id === commment.userId || req.user.id === video.userId)
        {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The Comments has been deleted");
        }
        else
        {
            return next(createError(403, "You can delete only your own comment"));
        }
    }catch(err)
    {
        next(err);
    }
}
export const getComment = async (req,res,next) => {
    try{
        const comments = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(comments);
    }catch(err)
    {
        next(err);
    }
}