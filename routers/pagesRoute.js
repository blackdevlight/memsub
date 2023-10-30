const express = require('express');
const pagesController = require('../controllers/pagesController');
const router = express.Router();

router.get('/', pagesController.getHomepage);
router.get('/login', pagesController.getLoginPage);

module.exports = router;