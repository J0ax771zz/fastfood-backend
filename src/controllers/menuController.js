const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async list(req, res) {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  },

  async get(req, res) {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  }
};
