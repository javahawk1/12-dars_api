const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://djakhadeveloper:NnuhSzuKtIzSUIWd@cluster0.zmaencv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err))

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
})

const Product = mongoose.model("Product", productSchema)

app.get("/", async (req, res) => {
    try {
        let data = await Product.find()
        res.send(data)
    } catch (err) {
        res.send({ text: "product olishda xatolik" })
    }
})

app.post("/", async (req, res) => {
    try {
        let data = await Product.create(req.body)
        res.send(data)
    } catch (err) {
        res.send({ text: "product qoshishda xatolik" })
    }
})

app.patch("/:id", async (req, res) => {
    try {
        let data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(data)
    } catch (err) {
        res.send({ text: "productni o'zgartirishda xatolik" })
    }
})

app.delete("/:id", async (req, res) => {
    try {
        let data = await Product.findByIdAndDelete(req.params.id)
        res.send(data)
    } catch(err) {
        res.send({text: "productni o'chirishda xatolik"})
    }
})

app.listen(3000, () => {
    console.log("server started")
})