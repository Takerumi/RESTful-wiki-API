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

////////////////////////Requests Targetting All Articles////////////////////////

app
  .route('/articles')
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles)
      } else {
        res.send(err)
      }
    })
  })
  .post((req, res) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    })

    article.save((err) => {
      if (!err) {
        res.send('Successfully added a new article')
      } else {
        res.send(err)
      }
    })
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send('Successfully deleted all articles')
      } else {
        res.send(err)
      }
    })
  })

////////////////////////Requests Targetting A Specific Article////////////////////////

app.route('/articles/:articleTitle').get((req, res) => {
  Article.findOne(
    {
      title: req.params.articleTitle,
    },
    (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle)
      } else {
        res.send('No articles matching this title was found')
      }
    }
  )
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
