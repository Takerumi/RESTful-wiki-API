const express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  port = process.env.PORT || 3000

require('dotenv').config()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect(process.env.DB_HOST)

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
  }),
  Article = new mongoose.model('Article', articleSchema)

app.get('/articles', (req, res) => {
  Article.find({}, (err, foundArticles) => {
    if (!err) {
      res.send(foundArticles)
    } else {
      res.send(err)
    }
  })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
