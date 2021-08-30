import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import './database/index';
import setup from './config/passport';

// route
import usersRoutes from './routes/users';
import plaidRoutes from './routes/plaid';

const app = express();

const port = process.env.PORT;

const publicDirectory = require('path').join(__dirname, '../');

app.use(logger("dev"));
app.use(cookieParser());
app.use(
	urlencoded({
		extended: false
	})
);
app.use(json());  
app.use(express.static('dist'));
app.use(express.json());
app.use(
	cors({
	  origin: true,
	  credentials: true,
	  methods: ['GET', 'POST', 'PATCH', 'DELETE']
	})
  );
app.use(passport.initialize());
  
setup(passport);

app.use('/api/users', usersRoutes);
app.use('/api/plaid', plaidRoutes);

app.get('/data', (req, res) => {
	res.send('Backend is Connected!')
})

const HTML_FILE = require('path').join(publicDirectory, "/index.html");

app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
});

app.listen(port, () => {
	console.log(`App is now started on port ${port}`);
});
