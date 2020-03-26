const router = require('express').Router()
module.exports = router


// example 'usaMap' api route
router.use('/usaMap', require('./usaMap'))


// 404 error handling
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
