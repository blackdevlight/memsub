const express = require('express');
const ejs = require('ejs');
const ebookRoute = require('./routers/pagesRoute');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', ebookRoute);
app.use('/login', ebookRoute);



//listen for port 3000 or env port
const port = 3000 || process.env.PORT;
app.listen(port, () =>  `server started at ${port}`);