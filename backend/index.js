import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './modules/posts/routes/posts.js';
import userRoutes from './modules/users/routes/users.js';

const app = express();
dotenv.config();
// setting up body parser
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// https://www.mongodb.com/cloud/atlas

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))).catch((error) => console.log(error));

//ensure no warnings in console
mongoose.set('useFindAndModify', false);
