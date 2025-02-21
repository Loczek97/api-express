const router = require('express').Router();
const { getPosts, createPost, deletePost, getPostById } = require('../controllers/PostsController');

router.route('/')
    .get(getPosts)
    .post(createPost)
    .delete(deletePost);

router.route('/:_id')
    .get(getPostById);

module.exports = router;
