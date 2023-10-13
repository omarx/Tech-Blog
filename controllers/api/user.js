const router=require('express').Router();
const {User}=require('../../models');


router.post('/login',async(req,res)=>{
    try{
        const userData = await User.findOne({
            where: {
                username:req.body.username
            }
        });
        if(!userData){
            return res
            .status(400)
            .json({
                message:"No user with that info found"
            })
        
        }
        const validPassword=await userData.checkPassword(req.body.password);
        
        if(!validPassword){
            return res.status(400).json({message:"Incorrect please try again!!!"})
        }
        req.session.save(err => {
            if(err) {
                return res.status(500).json(err);
            }
            
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            return res.status(200).json({
                user: userData, 
                message: 'You are logged in!'
            });
        })

    }catch(err){
       return res.status(500).json({message:"That doesn't seem to work there maybe another issue"});
    }
})
//Creates user account;
router.post('/signup',async(req,res)=>{
    try{
        const createUserData=await User.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        });
       return res.status(200).json(createUserData);
    }catch(err){
        return res.status(400).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        return res.status(204).end();
      });
    } else {
      return res.status(404).end();
    }
  });

  module.exports=router;