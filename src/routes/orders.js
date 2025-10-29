const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.create);
router.get('/', auth, controller.list);
router.get('/:id', auth, controller.get);

module.exports = router;
