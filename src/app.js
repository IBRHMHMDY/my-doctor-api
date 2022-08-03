import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();

// Security Data
app.use(cors());

// Specify Data Direction [Post or Get]
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// request Info
app.use(morgan('dev'));

// Validation Data
app.use(expressValidator());

// Routes
app.use('/', routes);



app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status =404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
});

export default app;