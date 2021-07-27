const router = require("express").Router();
const { findByIdAndDelete } = require("../models/Post");
const Post = require("../models/Post");

// create a post
router.post("/", async(req, res) => {
    const newPost = await new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err);
    }
})

// update a post
router.put("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json(`The post has been updated`)
        }else{
            res.status(404).json(`You can update only your post`);
        }

    }catch(err){
        res.status(500).json(err)
    }
}) 

// get a post

router.get("/:id", async(req, res) =>{
    try{

        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
        
    }catch(err){
        res.status(500).json(err);
    }
})

// delete a post

router.delete("/:id", async(req, res) => {
    
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json(`The post has been deleted`)
        }else{
            res.status(404).json(`You can only delete your post`);
        }

    }catch(err){
        res.status(500).json(err)
    }
}) 

// like a post
// unlike a post



module.exports = router;