const express = require('express');
const mongoConnect = require('./server/mongo')
const bodyParser = require('body-parser');
const homeworkRouter = require('./server/router/homeworkRouter')
const basicQuizRouter = require('./server/router/basicQuizRouter')
const subjectiveRouter = require('./server/router/subjectiveRouter')
const paperRouter = require('./server/router/paperRouter')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('src'));

app.get('/api', (req, res)=> {
    res.send("TODO...");
});

app.use('/api/homeworkQuiz', homeworkRouter)
app.use('/api/basicQuiz', basicQuizRouter)
app.use('/api/subjective', subjectiveRouter)
app.use('/api/paper', paperRouter)

app.listen(3200, ()=> {
    console.log("Server started: http://localhost:3200")
    mongoConnect.start()
});