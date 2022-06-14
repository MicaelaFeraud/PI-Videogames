const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require("./videogames");
const genres = require("./genres");
const videogame = require("./videogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/videogame", videogame);

module.exports = router;