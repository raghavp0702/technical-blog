const express = require('express');
const router = require('express').Router();

const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const { update } = require('../models/User');

//CREATE
router.post('/', async(req, res) => {

    const newPost = new Post(req.body);
    
    try {
        const savedPost =await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }

})

// like post

router.put('/:id/like' , (req,res)=>{
    Post.findByIdAndUpdate(req.body.id, {$inc: {likes: 1}}, {new: true})
    .then(post => res.json(post))
    .catch(err => res.json(err));
})
router.put('/:id/unlike' , (req,res)=>{
    Post.findByIdAndUpdate(req.body.id, {$dec: {likes: 1}}, {new: true})
    .then(post => res.json(post))
    .catch(err => res.json(err));
})

// comment in post
router.put('/:id/comments' , async(req,res)=>{

    const comment = {
        text: req.body.text,
        postedBy : req.body.user,
        postedByUser: req.body.name
    }
    // console.log(comment);
    const data = await Post.findByIdAndUpdate(req.params.id, {$push :{comments:comment}}, {new: true})
    // .then(post =>res.json(post))
    .populate("comments.postedBy","_id username")
    // .then(post => res.json(post))
    .catch(err => res.json(err));

    res.status(200).json(data);

    // console.log(data);
    // return res.json(data);
    
})

//get comments
// router.get('/:id/comment' , (req,res)=>{

//     const comment = {
//         text: req.body.text,
//         postedBy : req.params.id
//     }

//     const savedComment = Post.findByIdAndUpdate(req.body.id, {$push :{comments:comment}}, {new: true})
//     .then(post => res.json(post))
//     .populate("comments.postedBy","_id username")
//     .catch(err => res.json(err));

    
// })



//UPDATE POST
router.put('/:id', async(req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try {
                
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body,
                },{new:true});
                ;
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else
        {
            res.status(401).json("You can only update your own post!");

        } 

    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE POST

router.delete("/:id",async(req,res)=>{
    
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            await post.delete();
            res.status(200).json("Post deleted successfully");
        }
        else
        {
            res.status(401).json("You can only update your own post!");
        } 

    } catch (err) {
        res.status(500).json(err);
    }

})

//GET ONE POST

router.get("/:id",async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(500).json(err);
    }

});

//GET ALL POSTS


router.get("/",async(req,res)=>{

    const username = req.query.user;
    const catName = req.query.cat;

    let posts;
    try{

        if(username) posts = await Post.find({username:username});
        else if(catName) posts = await Post.find({categories:{
            $in:[catName]
        }});
        else posts = await Post.find({});
    }
    catch(err)
    {
        res.status(500).json(err);
    }

    res.status(200).json(posts);
});

//add fovourites

router.post('/:id/favourites', async(req,res)=>{
    
        try{
            const post = await Post.findById(req.params.id);
            const user = await User.findById(req.body.id);
            if(!user.favourites.includes(post._id))
            {
                user.favourites.push(post._id);
                await user.save();

                console.log('favourites added');
                res.status(200).json(user);
            }
            else
            {
                res.status(401).json("Post already added to favourites");
            }
        }
        catch(err)
        {
            res.status(500).json(err);
        }
})

module.exports = router;
