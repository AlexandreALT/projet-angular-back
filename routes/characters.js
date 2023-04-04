// (Étape 1) Import de express
var express = require("express");

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur student
var character_controller = require("../controllers/character");

// (Étape 2) Ajout de la route qui permet d'ajouter un étudiant
router.post("/", character_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les étudiants
router.get("/", character_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul étudiant grâce à son identifant
router.get("/:id", character_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul étudiant grâce à son identifant
router.put("/:id", character_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul étudiant grâce à son identifant
router.delete("/:id", character_controller.delete);

// (Étape 1) Export du router
module.exports = router;
