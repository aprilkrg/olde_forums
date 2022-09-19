let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /forums - create a new forum
router.post('/', (req, res) => {
  db.forum.create({
    name: req.body.name,
  })
  .then((forum) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /forums/new - display form for creating a new forum
router.get('/new', (req, res) => {
  res.render('forums/new')
})

// GET /forums/:id - display a specific forum
router.get('/:id', (req, res) => {
  db.forum.findOne({
    where: { id: req.params.id }
  })
  .then((forum) => {
    if (!forum) throw Error()
    res.render('forums/show', { forum: forum })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
