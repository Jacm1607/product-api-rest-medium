var express = require('express');
const { index, create, update, destroy } = require('../controllers/products');
var router = express.Router();

/* GET home page. */
router.get('/', index); //

router.post('/', create); //

router.patch('/:id', update); 

router.delete('/:id', destroy); //
router.put('/:id', destroy); //

module.exports = router;
