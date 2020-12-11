const error = require("./errors");
const Post = require('../Model/post');
const Comment = require('../Model/Comment');
exports.generate = (req, res, next) => {
  // const post = new Post({
  //   name: "Niloy",
  //   description: 'Hi, this is my 3rd post',
  //   reaction: [{
  //     name: "Rafat",
  //     reaction: 'Angry'
  //   }]
  // });
  // post.save().then((result) => {
  //   res.json(result);
  // }).catch((err) => next(Error(err)));

  const comment = new Comment({
    name: 'Goru',
    description: '3',
  });
  comment.save().then(result => res.json(result)).catch((err) => next(Error(err)));

};

exports.list = (req,res,next) => {
  Post
    .find()
    // .sort({'reaction.serial': -1})
    .populate({
      path: 'comment',
    })
    .sort({'comment.description': -1})
    .then(result => {
    res.status(200).json(result);
  }).catch((err) => next(Error(err)));

  // Comment
  //   .find()
  //   .sort({'description': -1})
  //   .then(result => {
  //   res.status(200).json(result);
  // }).catch((err) => next(Error(err)))

  // Comment.findOne({description: '1'}).then(comment => {
  //   Post.findOneAndUpdate({name: "Nishat"}, {comment: comment._id}, {new : true})
  //     .then(result => {
  //       res.json(result);
  //     })
  // }).catch((err) => next(Error(err)))


}