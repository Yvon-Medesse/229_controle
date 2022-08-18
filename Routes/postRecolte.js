let express = require("express");
const { createPost, getPosts, getPostDetail, updatePost, isPost, isPoster } = require("../Controllers/postRecolte");
const { requireAuth, IsAuth } = require("../Controllers/user");
let router = express.Router();
router.get('/', getPosts)
router.get('/:id', getPostDetail)

router.post('/',requireAuth,IsAuth, createPost)

router.patch('/:id',requireAuth,IsAuth,isPoster, updatePost)

router.param("id", isPost)

module.exports = router