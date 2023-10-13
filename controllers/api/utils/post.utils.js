const {Post,Comment,User}=require('../../../models');

getSinglePost=async(postID)=>{
    return await Post.findOne({
        include:[{model:Comment,
            include:[User]},
            {model:User}],
        where:{
            id:postID
        }

    })

}
const getAllPost=async()=>{
   return await Post.findAll({
        include:[{model:Comment},{model:User}]
})
}

const getAllMyPosts=async(userId)=>{
   return await Post.findAll({
    include:[{model:Comment}],
    where:{
        user_id:userId,
    }
})};


const createPost=async(info)=>{
    return await Post.create({
        ...info.body,
        user_id:info.session.user_id,
    });
}
const getMyPosts=async(info)=>{
    return await Post.findOne({
        include:[{model:Comment}],
        where:{
            id:info.params.postID,
            user_id:info.session.user_id,
        }
    })
}

module.exports={
    getAllPost,
    getAllMyPosts,
    createPost,
    getMyPosts,
    getSinglePost
}