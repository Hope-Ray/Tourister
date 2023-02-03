import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find(); 
        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message :error.message});
    }
 }


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;   //ID coming from URL eg: /posts/123  mentioned in routes
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO posts available with that ID');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { _id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post available with that id');
    
    await PostMessage.findByIdAndRemove(_id);

    res.json({message: "Post is deleted Successfully"});
}