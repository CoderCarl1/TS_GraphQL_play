import express, { Application } from 'express';
import { hostname, db, port, hash } from './config/config';
import mongoose = require('mongoose');
import http from 'http';
import { graphQLSchema } from './graphql/schema/index';
import { graphQLresolvers } from './graphql/resolvers/index';
import { graphqlHTTP } from 'express-graphql';

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLresolvers,
        graphiql: true
    })
);

// app.get('/', (req, res, next) => {
//     res.send('Hello World');
//     // next()
// });

const httpServer = http.createServer(app);

mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.error('Error connecting to database', err);
        } else {
            console.warn('Connected to database!');
        }
    }
);

httpServer.listen(port, () => console.log(` server running on ${hostname}:${port}`));
