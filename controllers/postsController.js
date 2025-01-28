const Post = require("../models/Post");

async function getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json({ ok: true, posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createPost(req, res) {
    const { title, content, posts } = req.body;

    const date = new Date();

    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    try {
        if (posts) {
            const postsToInsert = posts.map(post => ({
                title: post.title,
                content: post.content,
                createdAt: { date: dateStr, time: timeStr }
            }));

            // res.send(postsToInsert);

            const result = await Post.insertMany(postsToInsert);
            return res.status(201).json({ ok: true, result: result });
        }
        else {
            const result = await Post.create({ title, content, created_at: { time: timeStr, date: dateStr } });
            res.status(201).json({ ok: true, result });
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
        res.status(200).json({ ok: true, result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getPosts, createPost, deletePost };
