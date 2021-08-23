const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection');
const { authMiddleware } = require('./auth/index');
const { resolvers, typeDefs } = require('./schemas');
const { start } = require('repl');
const { applyMiddleware } = require('redux');

const app = express();
const PORT = 3001;

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: authMiddleware
});
server.start()
// function async start(){await server.start()}
// server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if (process.env.JWT === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Connected on localhost:${PORT}`);
});

module.exports = app