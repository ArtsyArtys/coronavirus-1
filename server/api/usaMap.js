const router = require('express').Router()
const axios = require('axios')
module.exports = router

// https://www.cdc.gov/coronavirus/2019-ncov/map-cases-us.json
router.get('/', async (req, res, next) => {
  try {
    console.log("Hit the endpoint");
    const {data} = await axios.get('http://www.cdc.gov/coronavirus/2019-ncov/map-cases-us.json')
    const casesData = data.data
    res.json(casesData)
  }
  catch (err){
    next(err)
  }
})
