const express = require('express');
const router = express.Router();
const todoRoutes = require('./todo');

router.use('/todos', todoRoutes);

module.exports = router;
