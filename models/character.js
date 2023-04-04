// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");

// (Étape 2) Définition du schéma characters
const characterSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Contrôleur", "Sentinelle", "Duelliste", "Initiateur"],
  },
  skills: { type: Array, default: undefined, required: false, ref: "skills" },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
characterSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
characterSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle character
module.exports = mongoose.model("characters", characterSchema);
