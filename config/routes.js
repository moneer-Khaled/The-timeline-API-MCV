// const express = require('express')

// const route = express('Router')

// const pageController = require('../controller/pageController')

// route.get('/',pageController.HomePage)

// route.post('/Add', pageController.savePost)
// route.post('/Comment/:postid', pageController.saveComment)


// route.post('/edit-post/:id', pageController.updateOnePost);


// route.post('/delete-post/:id', pageController.deletePost);


// module.exports= route

const express = require("express");
const route = express.Router()

const pageController = require("../controller/pageController");

route.get('/', pageController.HomePage);

route.post("/Add", pageController.savePost);        // savePost instead of postMessage
route.post("/Comment/:postid", pageController.saveComment);

module.exports = route;