import * as yup from "yup";
import mongoose from "mongoose";
import Order from "../schemas/Order.js";
import Product from "../models/products.js";
import Category from "../models/categories.js";
import User from "../models/user.js";

class OrderControllers {
 
  async store(req, res) {
    
    const schema = yup.object({
      products: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            quantity: yup.number().required().min(1),
          })
        )
        .required("Products is a required field"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { products } = req.body;
    const productIds = products.map((p) => p.id);

   
    const findProducts = await Product.findAll({
      where: { id: productIds },
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });

   
    if (findProducts.length !== productIds.length) {
      const foundIds = findProducts.map((p) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      return res
        .status(404)
        .json({ error: `Products not found: ${missingIds.join(", ")}` });
    }

   
    const formattedProducts = findProducts.map((product) => {
      const orderedProduct = products.find((p) => p.id === product.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category ? product.category.name : "Sem categoria",
        url: product.url,
        quantity: orderedProduct.quantity,
      };
    });

   
    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProducts,
      status: "Pedido Realizado",
    };

    try {
      const createdOrder = await Order.create(order);
      return res.status(201).json(createdOrder);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao criar o pedido", details: err.message });
    }
  }

  
  async index(req, res) {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao listar pedidos", details: err.message });
    }
  }

  
  async update(req, res) {
    
    const schema = yup.object({
      status: yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;
    const { status } = req.body;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    try {
      const result = await Order.updateOne({ _id: id }, { status });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Status atualizado com sucesso!" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar status", details: err.message });
    }
  }
}

export default new OrderControllers();
