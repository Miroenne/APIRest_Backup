const express = require('express');
const router = express.Router();

const service = require("../services/users");
const private = require("../middlewares/private");

router.get("/:id", private.checkJWT, service.getById); /* lire les infos */
router.put("/add", service.add); /* ajouter un utilisateur */ 
router.patch("/:id", private.checkJWT, service.update); /* modifier un utilisateur */
router.delete("/:id", private.checkJWT, service.delete); /* supprimer un utilisateur */

router.post('/authenticate', service.authenticate); /* authentification d'un utilisateur */

module.exports = router;