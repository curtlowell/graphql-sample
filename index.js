const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphResolvers = require('./graphql/resolvers/index')

const isAuth = require('./middleware/is-auth')
const cors = require('./middleware/cors')

const app = express()

app.use(bodyParser.json())

app.use(cors)

app.use(isAuth)

app.get('/', (req, res, next) => {
    res.send('Hello')
})

app.use('/graphql', graphqlHttp({
   schema: graphQlSchema,
   rootValue: graphResolvers,
   graphiql: true
}))

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-idwhj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true })
   
let db = mongoose.connection;

db.once('open', () => {
    app.listen(3000)
    console.log('connected to the database')
});



