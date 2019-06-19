const express = require('express');
//const expressValidator = require('express-validator');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

var whitelist = ['http://192.168.100.82'];
var corsOptions = {
  origin: function (origin, callback) {    
    if (whitelist.indexOf(origin) !== -1 || !origin ){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

routes(app);
app.listen(port);
console.log("running on..." + port);