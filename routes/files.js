const express = require('express');
const router = express.Router();

const service = require('../services/files');
const multer = require('../middlewares/files-storage');
const private = require('../middlewares/private');

console.log('private', private);
console.log('service', service);

/* router.get('/', private.checkJWT, service.getAllFiles); */
router.post('/', /*private.checkJWT,*/ multer.single, service.createOneFile);
router.get('/:id', private.checkJWT, service.getOneFile);
router.put('/:id', private.checkJWT, multer.single, service.modifyOneFile);
router.delete('/:id', private.checkJWT, service.deleteOneFile);

module.exports = router;