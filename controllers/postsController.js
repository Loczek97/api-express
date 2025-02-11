const Post = require("../models/Post");

async function getPosts(req, res) {
    try {
        const posts = await Post.find({}, { content: 0 });
        res.status(200).json({ ok: true, data: posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getPostById(req, res) {
    const { _id } = req.params;

    try {
        const post = await Post.findById(_id);
        if (!post) {
            return res.status(404).json({ ok: false, message: "Post nie znaleziony" });
        }
        res.status(200).json({ ok: true, data: post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createPost(req, res) {
    const { title, content, posts } = req.body;

    try {
        if (posts) {
            const result = await Post.insertMany(posts);
            return res.status(201).json({ ok: true });
        }
        else {
            const result = await Post.create({ title, content });
            res.status(201).json({ ok: true });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deletePost(req, res) {
    const { _id } = req.body;

    try {
        const result = await Post.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).json({ ok: false, message: "Post nie znaleziony" });
        }
        res.status(200).json({ ok: true, message: "Post usunięty" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getPosts, createPost, deletePost, getPostById };
