const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { sign } = require("../utils/jwt");

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashed },
      });
      const token = sign({ id: user.id, email: user.email });
      res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      res
        .status(400)
        .json({ error: "Erro ao criar usuário", details: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(400).json({ error: "Usuário não encontrado" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: "Senha inválida" });
      const token = sign({ id: user.id, email: user.email });
      res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      res.status(500).json({ error: "Erro no login", details: err.message });
    }
  },
};
