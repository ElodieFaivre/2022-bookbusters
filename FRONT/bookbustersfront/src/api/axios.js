// Fichier de configuration globale pour axios
// avec la clé baseURL

import axios from "axios";

export default axios.create({
  baseURL: "https://bookbusters.herokuapp.com/",
});
