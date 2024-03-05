
const express = require('express');
const router = express.Router();
const app=express();
const cors = require('cors');


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const studmodel=require('./db')
const usersRouter=require('./routes/usersRouter')
const bookRouter=require('./routes/bookRouter')
const genreRouter=require('./routes/genreRouter')
const LanguageRouter=require('./routes/languageRouter')
const DownloadRouter= require('./routes/downloadRouter')
const AdminRouter = require('./routes/adrouter')





app.use(cors());
app.use(express.json())
app.use('/api/books',bookRouter)
app.use('/api/users', usersRouter)
app.use('/api/genres',genreRouter)
app.use('/api/languages',LanguageRouter)
app.use('/api/download',DownloadRouter)
app.use('/api/admin',AdminRouter)


app.listen(3005,()=>

    console.log("connected")
)