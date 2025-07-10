const Commentmodel = require('../model/commentModel');
const Postmodel = require('../model/postModel');

const HomePage = (req, res) => {
  Postmodel.find()
    .populate({
      path: 'commentId',
      options: { sort: { createdAt: 1 } }
    })
    .then(posts => {
      res.render('Home', { posts });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
};

const savePost = (req, res) => {
  const newPost = new Postmodel(req.body);
  newPost.save()
    .then(() => res.redirect('/'))
    .catch(err => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send(err.message);
      }
      res.status(500).send('Server error');
    });
};

const saveComment = (req, res) => {
  const postId = req.params.postid;
  const newComment = new Commentmodel(req.body);

  newComment.save()
    .then(comment => {
      Postmodel.findById(postId)
        .then(post => {
          if (!post) {
            return res.status(404).send('Post not found');
          }
          post.commentId.push(comment._id);
          post.save()
            .then(() => res.redirect('/'))
            .catch(err => {
              console.error(err);
              res.status(500).send('Error saving post with comment');
            });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Server error finding post');
        });
    })
    .catch(err => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send(err.message);
      }
      res.status(500).send('Server error');
    });
};

module.exports = {
  HomePage,
  savePost,
  saveComment
};
