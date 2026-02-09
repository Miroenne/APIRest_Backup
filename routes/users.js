const express = require('express');
const router = express.Router();

const service = require("../services/users");

router.get("/:id", service.getById); /* lire les infos */
router.put("/add", service.add); /* ajouter un utilisateur */ 
router.patch("/:id", service.update); /* modifier un utilisateur */
router.delete("/:id", service.delete); /* supprimer un utilisateur */

router.post('/authenticate', service.authenticate); /* authentification d'un utilisateur */

module.exports = router;