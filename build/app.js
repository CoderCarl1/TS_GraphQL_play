"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const mongoose = require("mongoose");
const http_1 = __importDefault(require("http"));
const index_1 = require("./graphql/schema/index");
const index_2 = require("./graphql/resolvers/index");
const express_graphql_1 = require("express-graphql");
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: index_1.graphQLSchema,
    rootValue: index_2.graphQLresolvers,
    graphiql: true
}));
// app.get('/', (req, res, next) => {
//     res.send('Hello World');
//     // next()
// });
const httpServer = http_1.default.createServer(app);
mongoose.connect(config_1.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.error('Error connecting to database', err);
    }
    else {
        console.warn('Connected to database!');
    }
});
httpServer.listen(config_1.port, () => console.log(` server running on ${config_1.hostname}:${config_1.port}`));
//# sourceMappingURL=app.js.map