import * as yup from "yup";
import Product from "../models/products.js";
import Category from "../models/categories.js";
import User from "../models/user.js";

class productControllers {
  async store(req, res) {
    const schema = yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      category_id: yup.number().required(),
      offer: yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const { filename } = req.file;
    let { name, price, category_id, offer } = req.body;

    category_id = Number(category_id);
    price = Number(price);

    if (offer !== undefined) {
      if (typeof offer === "string") {
        offer = offer.toLowerCase() === "true";
      } else {
        offer = Boolean(offer);
      }
    }

    try {
      const product = await Product.create({
        name,
        price,
        category_id,
        path: filename,
        offer,
      });

      return res.status(201).json({
        message: "Produto criado com sucesso!",
        product: {
          ...product.toJSON(),
          url: `http://localhost:3001/product-files/${filename}`,
        },
      });
    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
      return res.status(500).json({
        error: "Erro ao salvar o produto",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    const schema = yup.object({
      name: yup.string(),
      price: yup.number(),
      category_id: yup.number(),
      offer: yup.boolean(),
    });

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    if (req.body.offer !== undefined) {
      if (typeof req.body.offer === "string") {
        req.body.offer = req.body.offer.toLowerCase() === "true";
      } else {
        req.body.offer = Boolean(req.body.offer);
      }
    }

    if (req.body.price !== undefined) {
      req.body.price = Number(req.body.price);
    }

    if (req.file) {
      req.body.path = req.file.filename;
    }

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    try {
      await product.update(req.body);

      return res.json({
        message: "Produto atualizado com sucesso!",
        product,
      });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.json(products);
  }

  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    try {
      await product.destroy();

      return res.status(200).json({
        message: "Produto excluído com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      return res.status(500).json({ error: "Erro ao excluir produto" });
    }
  }
}

export default new productControllers();