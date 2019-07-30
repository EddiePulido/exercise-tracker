const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');

const path = require("path");


// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../public")))

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
// const connection = mongoose.connection;
// connection.once('open', () =>{
//     console.log("MongoDB database connection established successfully");
// })

require("./config/mongoose");

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html')); //relative path
    })
}

app.listen(port,() => {
    console.log(`server is running on port: ${port}`)
})