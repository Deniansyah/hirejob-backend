const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', require('./src/routes'))

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'berhasil'
    })
})

app.listen(8888, () => {
    console.log(`app listening on port 8888`)
})
