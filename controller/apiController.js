const Postmodel = require('../model/postModel');
const Commentmodel = require('../model/commentModel');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Postmodel.find()
      .populate({
        path: 'commentId',
        options: { sort: { createdAt: 1 } }
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const postOnePost = async (req, res) => {
  try {
    if (!req.body.title || req.body.title.length < 25) {
      return res.status(400).json({ message: 'Title is required and should be at least 25 characters.' });
    }
    const newPost = new Postmodel(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    if (updatedData.title && updatedData.title.length < 25) {
      return res.status(400).json({ message: 'Title should be at least 25 characters.' });
    }

    const updatedPost = await Postmodel.findByIdAndUpdate(postId, updatedData, { new: true });

    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Postmodel.findByIdAndDelete(postId);

    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });

    await Commentmodel.deleteMany({ _id: { $in: deletedPost.commentId } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllCommentsPost = async (req, res) => {
  try {
    const postId = req.params['id-post'];
    const post = await Postmodel.findById(postId).populate('commentId');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post.commentId);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const postOneComment = async (req, res) => {
  try {
    const postId = req.params['id-post'];
    const { commentBody } = req.body;

    if (!commentBody || commentBody.length < 25) {
      return res.status(400).json({ message: 'Comment body is required and should be at least 25 characters.' });
    }

    const post = await Postmodel.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = new Commentmodel({ commentBody });
    await newComment.save();

    post.commentId.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllPosts,
  postOnePost,
  updateOnePost,
  deletePost,
  getAllCommentsPost,
  postOneComment
};
