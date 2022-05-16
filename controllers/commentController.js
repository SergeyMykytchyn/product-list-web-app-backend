const ApiError = require("../error/ApiError");
const { Comment } = require("../models/models");

class CommentController {
  async create(req, res, next) {
    try {
      const { productId, description } = req.body;
      const comment = await Comment.create({ productId, description });
      return res.json(comment);
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }
}

module.exports = new CommentController();
