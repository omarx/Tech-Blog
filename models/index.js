const Post = require('./post');
const User=require('./user');
const Comment=require('./comment');

//User can have many post
User.hasMany(Post,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

//User can also have many comments
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
})

// A Post can have many comments
Post.hasMany(Comment,{
    foreignKey:'post_id',
    onDelete:'CASCADE'
});

// A Post belongs to a single User
Post.belongsTo(User, {
    foreignKey: 'user_id'
}); 

// A Comment belongs to a single User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// A Comment belongs to a single Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports={
    Post,
    Comment,
    User,
}
