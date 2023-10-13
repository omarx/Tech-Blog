const router =require('express').Router();
const {getAllMyPosts,getAllPost,createPost}=require('./utils/post.utils');
const {Post,Comment}=require('../../models');
const withAuth=require('../../utils/auth');

router.get('/',async(req,res)=>{
    try{
      return res.status(200).json(await getAllPost());
    }catch(err){
      return res.status(500).json(err);
    }
})

// This part needs to get your posts based on your auth info

router.get('/mypost',withAuth,async(req,res)=>{
    try{
        const getMyPosts=await getAllMyPosts(req.session.user_id);
        if(!await getMyPosts.length){
            return res.status(404).json({
                message:'No post found with this user id'
            })
        }
       return res.status(200).json(await getMyPosts);
    }catch(err){
        return res.status(500).json(err);
    }
})

//This part requires auth as well
router.post('/',withAuth, async(req,res)=>{
    try{
        return res.status(200).json(await createPost(req));
    }catch(err){
        return res.status(500).json(err);
    }
});

router.put('/:postId',withAuth,async(req,res)=>{
    try{
        const updatePost=await Post.findOne({
            where:{
                id:req.params.postId,
                user_id:req.session.user_id
            }
        });
        if(!updatePost){
         return res.status(404).json({
            message:"Not post found with this id"
         })
        }
        updatePost.title=req.body.title;
        updatePost.body=req.body.body;

        await updatePost.save();
        return res.status(200).json(updatePost);
    }catch(err){
        return res.status(500).json({message:"Something broke here?"})
    }
})

router.delete('/:postId',withAuth,async(req,res)=>{
    try{
        const postData=await Post.destroy({
            where:{
                id:req.params.postId,
                user_id:req.session.user_id,
            },
        })
        if(!postData){
            res.status(404).json({
                message:"No Post found with this id!"
            });
            return;
        }
        res.status(200).json(postData);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;