require('dotenv').config()
const express = require('express')
const app = express()


// TODO: import the getCityInfo and getJobs functions from util.js
const {getJobs, getCityInfo} = require('./util')


// TODO: Statically serve the public folder
app.use(express.static ('public'))

// TODO: declare the GET route /api/city/:city
app
    .route('/api/city/:city')
    .get(async (req, res) => { //async function to handle timing of data collection
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON. 
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

    //Set location equal to the parameter from the request /:city
    var location = req.params.city

    //Pull data from functions in ./util.js
    const cityInfo = await getCityInfo(location)
    const jobs =await getJobs(location)
    
    //Once info for each is gathered, check if value exists, if not, error and quit program
    if(!(cityInfo || jobs)) 
        return res.status(404).json({error: "Information not found"})

    //Values exist, populate into object of keys and return in JSON format
    res.json({cityInfo, jobs})

})
 
module.exports = app

