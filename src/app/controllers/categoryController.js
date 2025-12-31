import * as yup from "yup";
import Category from "../models/categories.js";
import User from "../models/user.js";

class CategoryController {
  async store(req, res) {
    const schema = yup.object({
      name: yup.string().required("Nome da categoria é obrigatório"),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(req.userId);
    if (!user || !user.admin) {
      return res.status(401).json({ error: "Acesso negado" });
    }

    const { name } = req.body;
    const path = req.file ? req.file.filename : null;

    
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ error: "Categoria já existe" });
    }

    const category = await Category.create({ name, path });

    return res.status(201).json(category);
  }

 async update(req, res) {
 
  const schema = yup.object({
    name: yup.string(),
  });

  try {
    schema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

 
  const user = await User.findByPk(req.userId);
  if (!user || !user.admin) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  const { id } = req.params; 
  const { name } = req.body;
  const path = req.file ? req.file.filename : null;

  const category = await Category.findByPk(id);
  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

 
  if (name && name !== category.name) {
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ error: "Nome da categoria já existe" });
    }
  }


  await category.update({
    name: name || category.name,
    path: path || category.path,
  });

  return res.status(200).json(category);
}
 

  async index(req, res) {
    try {
      const categories = await Category.findAll({ order: [["id", "ASC"]] });
      return res.json(categories);
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      return res.status(500).json({ error: "Erro ao listar categorias" });
    }
  }
}

export default new CategoryController();
