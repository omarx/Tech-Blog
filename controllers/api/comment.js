const router=require('express').Router();
const {Post,Comment,User}=require('../../models');
const withAuth=require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        // Extract comment data from the request body
        const { body, post_id } = req.body;

        // Ensure both body and post_id are provided
        if (!body || !post_id) {
            return res.status(400).json({ message: 'Comment body and associated post ID are required.' });
        }

        // Create a new comment
        const addComment = await Comment.create({
            body: body, // Comment text
            post_id: post_id, // ID of the associated post
            user_id: req.session.user_id // ID of the logged-in user
        });

        // Return the created comment as a response
        res.status(200).json(addComment);
    } 
    catch (err) {
        console.error(err); // For debugging purposes
        res.status(500).json(err);
    }
});

module.exports=router;