const express = require('express');
const router = express.Router();
const app=express();
const cors = require('cors');



const studmodel=require('./db')
const usersRouter=require('./routes/usersRouter')
const bookRouter=require('./routes/bookRouter')
const genreRouter=require('./routes/genreRouter')
const LanguageRouter=require('./routes/languageRouter')

app.use(cors());
app.use(express.json())
app.use('/api/books',bookRouter)
app.use('/api/users', usersRouter)
app.use('/api/genres',genreRouter)
app.use('/api/languages',LanguageRouter)

app.listen(3005,()=>

    console.log("connected")
)