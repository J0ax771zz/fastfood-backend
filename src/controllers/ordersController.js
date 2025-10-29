const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    const userId = req.user?.id || null;
    const { items, deliveryAddress, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Items invalid' });
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          deliveryAddress,
          items: {
            create: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price }))
          }
        },
        include: { items: true }
      });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar pedido', details: err.message });
    }
  },

  async list(req, res) {
    const userId = req.user?.id || null;
    const where = userId ? { userId } : {};
    const orders = await prisma.order.findMany({ where, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
    res.json(orders);
  },

  async get(req, res) {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({ where: { id }, include: { items: { include: { product: true } } } });
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(order);
  }
};
