const express = require("express");
const Router = express.Router();
const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require('../Model/User');
const Bharatia = require('../Model/Bharatia');
const Holding = require('../Model/Holding');
// const User = require("../Model/user");

Router.get("/sort", async (req, res, next) => {
  // POST CREATE
  // Post.create({
  //   title: "Something",
  //   user: "Saidur",
  //   post_serial: 1
  // }).then((post) => {
  //   console.log(post);
  //   res.send("Successfully Created");
  // }).catch((error) => {
  //   console.log(error);
  // })

  // POST FIND
  // Post.find({})
  //   .sort({"post_serial": 1})
  //   .populate('comments')
  //   // .group({"title": 1})
  //   .then((post) => {
  //     res.json(post);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.send("Some error occured");
  //   })

  // COMMENT CREATE
  // Comment.create({
  //   user: "Someone",
  //   content: "This is content-3",
  //   comment_serial: 3,
  // }).then((comment) => {
  //   res.json(comment);
  // }).catch(error => {
  //   console.log(error);
  //   res.json({message: "Some error occured"});
  // })

  // COMMENT FIND
  // Comment.find({})
  //   .then(comments => {
  //     res.json(comments);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.json({ message: "Some error occured!!!" });
  //   });

  // Add comment to Post
  // Post.findByIdAndUpdate("5fecf94071579a70684e8594", {comments: "5fed00ebcdd19a725cb30fbf"}, {new : true})
  //   .then(post => {
  //     console.log(post);
  //     res.json(post);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.json({ message: "Some error occured!!!" });
  //   });

  // const usr = await User.findOne();
  // console.log(usr);
  // res.send("Hi there!!");
  // const bharatias = await Bharatia.update({}, { 'holding.type': 'Room'});

  try {
    // const holdings = await Holding.find({'type': 'Room'}).sort({'serial': 1});
    // const bharatias = await Bharatia.find({'holding.type': 'Room'});
    // const bharatias = await Bharatia.find({
    //   'holding.type': 'Room',
    //   'active': true
    // }).sort({'holding.serial': 1});
    let time = new Date();
    let newTime = new Date(time.getFullYear(),time.getMonth()-1, 1);
    const invoice = {
      date: Date.now(),
      amount: 900,
      month: newTime,
    }
    const bharatias = await Bharatia.findById('5fd4be2ab62ff223a8f2254a');
    await bharatias.addToInvoices(invoice);
    // await bharatias.addToPayments(invoice);
    res.json(bharatias);
  } catch (error) {
    console.log(error);
    res.send("Some error occured!!!");
  }

});
  
module.exports = Router;
