// const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const items = require('./routes/items');
const sales = require('./routes/sales');
const ConnectToMongo = require('./db')

ConnectToMongo()
const app = express()
app.use(cors())
app.use(express.json())  //middleware to read request . body


const port = 3000

// Routes
app.use('/items', items);
app.use('/sales', sales);


app.listen(port,()=>{
    console.log(`Listening at ${port}`)
})

