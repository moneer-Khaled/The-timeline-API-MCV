const express = require("express");
const app = express();
require('./config/DB');

const webRoutes = require('./config/routes');      
const apiRoutes = require('./config/apiRoutes');   

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use(webRoutes);  
app.use(apiRoutes);   

app.listen(2500, () => console.log("Server is on 2500"));
