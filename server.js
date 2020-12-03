var firebaseConfig = {
    apiKey: "AIzaSyBtN6-jDN4uLDmR7HRpm8K08i3Z7odNccw",
    authDomain: "strv-project-44233.firebaseapp.com",
    databaseURL: "https://strv-project-44233.firebaseio.com",
    projectId: "strv-project-44233",
    storageBucket: "strv-project-44233.appspot.com",
    messagingSenderId: "201262828271",
    appId: "1:201262828271:web:6d74ab5737a354580b691a",
    measurementId: "G-4Z0H0H84NR"
};
var express = require('express')
var app = express()
var firebase = require('firebase')
require('firebase/firestore')
var session = require('express-session')
var bcrypt = require('bcrypt')
var path = require('path')
var { Pool } = require('pg')
var pool = new Pool({ database: 'users' })
var bodyParser = require('body-parser')

firebase.initializeApp(firebaseConfig)

app.use(bodyParser.json())

app.use(express.static('views'))

app.get('/login', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    let cols = [email];
    pool.query(
      'SELECT * FROM user_information WHERE email = $1 LIMIT 1',
      cols,
      (err, data) => {
        if (err) {
          res.json({
            success: false,
            msg: 'An error occured, please try again',
          });
          return;
        }
        // check if data is correct also for the if statement.
        // console.log(data)
        // then
        // console.log(data[0])
        if (data && data.length === 1) {
          bcrypt.compare(password, data[0].password, (bcrypt, verified) => {
            if (verified) {
              res.json({
                success: true,
                msg: 'User is logged in',
              });
              return;
            } else {
              res.json({
                success: false,
                msg: 'Invalid password',
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: 'User not found, please try again',
          });
        }
      }
    );
  });

app.get('/signup', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.sendFile(path.join(__dirname + '/views/signup.html'))
})

app.post('/signup', (req, res) => {
    console.log(req.body)
    const saltRounds = 12;
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
      const { email } = req.body;
      const password = hash;
      let cols = [email, password];
      pool.query(
        'INSERT INTO user_information (email, password) VALUES ($1, $2);',
        cols,
        (err) => {
          if (err) {
            res.json({
              success: false,
              msg: 'An error occured, please try again',
            });
          } else {
            console.log({
              success: true,
              msg: 'You have successfully created your account',
            });
            res.redirect('/login')
          }
        }
      );
    });
  });

app.get('/contact', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.sendFile(path.join(__dirname + '/views/contact.html'))
})

app.post('/contact', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    const {firstName, lastName, phone, address} = req.body
    console.log(req.body)
    var db = firebase.firestore()
    db.collection('contacts').add(req.body).then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        console.log({message: 'successfully saved'})
    })
    .catch(error => {
        console.log('Error adding document', error)
    }) 
})

app.listen(3000)