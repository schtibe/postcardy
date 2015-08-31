/* global require */
import express    from 'express'
import path       from 'path'
import routes     from './routes'
import morgan     from 'morgan'
import bodyParser from 'body-parser'
import cors       from 'cors'

let app = express()
export default app

app.use(morgan('dev'));

app.use(cors());

app.use('/uploads', express.static(__dirname + '/../uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

