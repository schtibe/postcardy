/* global require */
let express    = require('express')
let path       = require('path')
let routes     = require('./routes')
let morgan     = require('morgan')
let bodyParser = require('body-parser')
let cors       = require('cors')

let app = express()
export default app

app.use(morgan('dev'));

app.use(cors());

app.use('/uploads', express.static(__dirname + '/../uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

