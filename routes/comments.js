const express = require('express');
const {postComment, getCommentsByFilters, addLike, minusLike} = require("../controllers/CommentController");
const router = express.Router({ mergeParams: true });

router.get('/', getCommentsByFilters);
router.post('/', postComment);
router.patch('/:commentId/like', addLike);
router.patch('/:commentId/unlike', minusLike)

module.exports = router;

