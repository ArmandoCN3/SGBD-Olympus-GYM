require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/mongo')
const verificarPagos = require('./utils/verificarPagos')
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

/**
 * Aqui invocamos a las rutas
 */
    app.use("/",require("./routes"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

dbConnect()
verificarPagos()