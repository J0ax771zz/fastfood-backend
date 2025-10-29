const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => res.send({ ok: true }));

module.exports = app;
