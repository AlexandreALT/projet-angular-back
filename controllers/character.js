// Import du modèle character
var Character = require("../models/character");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const characterValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Name must be specified.")
      .isAlphanumeric()
      .withMessage("Name has non-alphanumeric characters."),

    body("role")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Role must be specified."),
  ];
};

const paramIdValidationRule = () => {
  return [
    param("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

const bodyIdValidationRule = () => {
  return [
    body("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

// Méthode de vérification de la conformité de la requête
const checkValidity = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Create
exports.create = [
  bodyIdValidationRule(),
  characterValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de character à ajouter
    var character = new Character({
      _id: req.body.id,
      name: req.body.name,
      role: req.body.role,
      skills: req.body.skills,
    });

    // Ajout de character dans la bdd
    character.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json("Character created successfully !");
    });
  },
];

// Read
exports.getAll = (req, res, next) => {
  Character.find(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  }).populate("skills");
};

exports.getById = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Character.findById(req.params.id)
      .populate("skills")
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
  },
];

// Update
exports.update = [
  paramIdValidationRule(),
  characterValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de character à modifier
    var character = new Character({
      _id: req.params.id,
      name: req.body.name,
      role: req.body.role,
      skills: req.body.skills,
    });

    Character.findByIdAndUpdate(
      req.params.id,
      character,
      function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if (!result) {
          res
            .status(404)
            .json("Character with id " + req.params.id + " is not found !");
        }
        return res.status(201).json("Character updated successfully !");
      }
    );
  },
];

// Delete
exports.delete = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Character.findByIdAndRemove(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Character with id " + req.params.id + " is not found !");
      }
      return res.status(200).json("Character deleted successfully !");
    });
  },
];
