// Import du modèle skill
var Skill = require("../models/skill");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const skillValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Name must be specified."),

    body("description")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Description must be specified."),
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
  skillValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de skill à ajouter
    var skill = new Skill({
      _id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    });

    // Ajout de skill dans la bdd
    skill.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json("Skill created successfully !");
    });
  },
];

// Read
exports.getAll = (req, res, next) => {
  Skill.find(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Skill.findById(req.params.id)
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
  skillValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de skill à modifier
    var skill = new Skill({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    });

    Skill.findByIdAndUpdate(req.params.id, skill, function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Skill with id " + req.params.id + " is not found !");
      }
      return res.status(201).json("Skill updated successfully !");
    });
  },
];

// Delete
exports.delete = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Skill.findByIdAndRemove(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Skill with id " + req.params.id + " is not found !");
      }
      return res.status(200).json("Skill deleted successfully !");
    });
  },
];
