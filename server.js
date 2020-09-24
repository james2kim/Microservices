'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const validator = require ('validator')

const cors = require('cors');

const app = express();

const FormView = require ('./formView')

// Basic Configuration 
var port = process.env.PORT || 3000;
app.use(cors());

/** this project needs a db !! **/ 


// mongoose.connect(process.env.DB_URI);
const URI='mongodb+srv://pgcjameskim:xsncr471@cluster0-s8pey.mongodb.net/<dbname>?retryWrites=true&w=majority'
process.env.URI=URI
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

const schema = mongoose.Schema

// Create a URl Schema that holds the original and shortened URL to be accessed later 
const URLSchema = new schema({
  originalURL:{type:String,isRequired:true},
  shortenedURL:String
})

// Create a URL model to be used 
const URL = mongoose.model('URL',URLSchema)


// Function to create and save a new url 
const createAndSaveURL = async function(originalURL,shortenedURL){
     const url= new URL({originalURL,shortenedURL})
    return await url.save();
}



/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

// Function for Validating URL according to HTTP and HTTPS

   function isValidURL(url) {
     
        const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(url)) {
        
            return true;
        } 
          
            return false;
    }


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// To loas the page where we submit a form with our URL
app.get("/api/shorturl/new", (req,res) => {
  res.send(FormView({req}))
})


// Form handler for submissions of our URL
app.post('/api/shorturl/new', async (req,res) => {
  
  const originalURL = req.body.url
  const index = originalURL.indexOf('.')
   
//  If the URL is invalid or does not follow the http(s) protocol, send error message  
 if (!isValidURL(originalURL)) 
 {
   res.json({error:'Invalid URL'})
 }  
//   Otherwise we will create a new instance of URL in our database and return a json with original and shortened URL
  else 
  {
//     Shortened URL does not follow any specific guidelines other than it being shorter than our original url 
     const shortenedURL = originalURL.slice(index+1, index+5)
       
      await createAndSaveURL(originalURL,shortenedURL) 
    res.json({originalURL,shortenedURL})
 }
   
})


app.get('/api/shorturl/:short_url', async (req,res) => {
  
//   Search the database which has a shortenedURL matching that of the request parameter
  const shortSearch = await URL.findOne({shortenedURL:req.params.short_url})
  
//  redirect user to the original url 
  res.redirect(shortSearch.originalURL)
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});