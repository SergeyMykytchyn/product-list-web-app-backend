const ApiError = require("../error/ApiError");
const { Product, Comment } = require("../models/models");

class ProductController {
  async create(req, res, next) {
    try {
      const { imageUrl, name, count, width, height, weight } = req.body;
      if (!imageUrl || !name || !count || !width || !height || !weight) {
        return next(ApiError.internal("All fields must be filled"));
      }
      const product = await Product.create({ imageUrl, name, count, width, height, weight });
      return res.json(product);
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async update(req, res, next) {
    try {
      const { id, imageUrl, name, count, width, height, weight } = req.body;

      const product = await Product.update({ imageUrl, name, count, width, height, weight }, { where: { id } });
      if (!product[0]) {
        return next(ApiError.internal("Product is not found"));
      }
      return res.json({ message: "Product was updated" });
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [{
          model: Comment
        }]
      });
      return res.json(product);
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.destroy({ where: { id } });
      if (!product) {
        return next(ApiError.internal("Product is not found"));
      }
      return res.json({ message: "Product was deleted" });
    } catch(err) {
      return next(ApiError.internal("Unexpected error"));
    }
  }
}

module.exports = new ProductController();
