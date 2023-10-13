const express=require('express');
const router=express.Router();
const {getAllPost,getSinglePost}=require('./api/utils/post.utils')

router.get('/', async (req, res) => {
    try {
        const loggedIn=!!req.session.user_id;
        const PostData=await getAllPost();
        const posts = PostData.map((post) => post.get({ plain: true }));
        res.render('home',{
            posts,
            loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login',async(req,res)=>{
    try{
       const loggedIn=!!req.session.user_id;
       
        if(loggedIn){
            res.redirect('/dashboard');
        }
       res.render('login',{
        layout:'main',
        loggedIn
       });
    }catch(err){
        return res.status(500).json(err);
    }
})

router.get('/signup',async(req,res)=>{
    try{
        const loggedIn=!!req.session.user_id;
        if(loggedIn){
            res.redirect('/dashboard')
        }
        res.render('signup',{
            layout:'main',
            loggedIn
        })
    }catch(err){
        return res.status(500).json(err);
    }
})
router.get('/post/:postID',async(req,res)=>{
    try{
        const postData=await getSinglePost(req.params.postID)
        const singlePostData = postData.get({ plain: true });
        const loggedIn=!!req.session.user_id;
        res.render('selected-post',{
            layout:'main',
            loggedIn,
            singlePostData
        })
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports=router;