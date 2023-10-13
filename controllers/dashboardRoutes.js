const express=require('express');
const router=express.Router();
const withAuth=require('../utils/auth');
const {getAllMyPosts,getMyPosts}=require('./api/utils/post.utils')


router.get('/',withAuth,async(req,res)=>{
    try{
        const myPostData=await getAllMyPosts(req.session.user_id);
        const postData=myPostData.map(post=>post.get({plain:true}));
        return res.render('my-posts', {
            layout: 'dashboard',
            postData,
            });
    }catch(err){
        return res.status(500).json(err);
    }
});

router.get('/add-post',withAuth,async(req,res)=>{
    try{
        return res.render('add-post',{
            layout:'dashboard',
        });
    }catch(err){
        return res.status(500).json(err);
    }
});

router.get('/edit-post/:postID',withAuth,async(req,res)=>{
   try{
        const postData=await getMyPosts(req);
        const myPostData = postData.get({ plain: true });
       return res.render('edit-post',{
        layout:'dashboard',
        myPostData
       });
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports=router;