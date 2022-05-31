// console.log('May Node be with you');

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect(
  "mongodb+srv://Luke:LCqkYcrIqzK6gTWO@cluster0.mio6sh5.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection('quotes')

    //=========
    // Middle-wares
    //=========
    app.set('view-engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(express.static('public'))
    

    //==========
    // Routes
    //==========
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(quotes => {
            res.render('index.ejs', { quotes: quotes })
          })
          .catch(/* ... */)
      })

      app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

    app.listen(3000, function () {
      // console.log('listening on 3000');      
    });
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
          { name: 'Yoda' },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote
            }
          },
          {
            upsert: true
          }
        )
          .then(result => res.json('Success'))
          .catch(error => console.error(error))
      })

      app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne({
            name: req.body.name
        })
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
          })
          .catch(error => console.error(error))
      })
  
    
  })

