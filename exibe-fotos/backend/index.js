require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()
//middleware (função que fica no "meio do caminho")
app.use(cors())
const pexelsClient = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
  headers: {
    Authorization: process.env.PEXELS_KEY
  }
})

//http://localhost:3000/search
//GET /search () => {}
//https://api.pexels.com/v1/search?query=cat&color=white
app.get('/search', async (req, res) => {
  const query = req.query.query
  const result = await pexelsClient.get('/search', {
    params: { query }
  })
  res.json(result.data)
})

const port = 3000
app.listen(port, () => console.log (`Back End OK! Porta ${port}.`))