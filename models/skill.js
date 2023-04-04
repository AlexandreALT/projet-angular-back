// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");

// (Étape 2) Définition du schéma characters
const skillSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
skillSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
skillSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle character
module.exports = mongoose.model("skills", skillSchema);
