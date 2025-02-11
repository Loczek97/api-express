const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.route('/')
    .get(postsController.getPosts)
    .post(postsController.createPost)
    .delete(postsController.deletePost);

router.route('/:_id')
    .get(postsController.getPostById);


module.exports = router;