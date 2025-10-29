const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  const products = [
    { name: 'Combo Clássico', description: 'Hambúrguer, batata e bebida', price: 25.99, image: '' },
    { name: 'X-Bacon Supreme', description: 'Queijo, bacon crocante', price: 29.9, image: '' },
    { name: 'Veggie Wrap', description: 'Opção vegetariana com hortaliças', price: 19.5, image: '' },
    { name: 'Porção de Batata', description: 'Batata frita crocante', price: 9.0, image: '' }
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p
    });
  }

  // create a demo user: password = "123456"

  const hashed = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: { name: 'Demo User', email: "demo@fastbite.com", password: hashed }
  });

  console.log('Seed completo');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
