const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
const PORT = 8000

    
//=======
// Middleware
//=======   
app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

//=======
// Routes
//======= 
//ejs
app.get('/', (req, res) => {
    res.render('index.ejs')     
})  

 
app.get('/message', (req, res) => {
    const radomMessage = randomizer(['Go on a hike(long break)', 'Take a walk', 'Stretch/Yoga', 'Have a snack', 'Play a game', 'Talk to a friend/loved one', 'Meditate', 'Coffee/Tea'])
    res.json(radomMessage)
})

function randomizer(arr){
    const random = Math.random()
    const response = arr[Math.floor(random * arr.length)]    
    return response
}

app.listen(process.env.PORT || PORT , () => {
    //process.env.PORT will default to heroku port first
    console.log(`The server is now running on port ${PORT}`);
}) 

 
    






