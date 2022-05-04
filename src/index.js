const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://anil_kumar8328:Iw8Yk2oxCn1DVfkD@cluster0.pfwm3.mongodb.net/Intership_project2?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

//hhhhhhhhhhhhhhh
//mongodb+srv://project-1_G10:OCBfkRxYDJRMsStJ@cluster0.evjpk.mongodb.net/project-blogs