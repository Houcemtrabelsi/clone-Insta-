
const express = require("express");
const app = express();
const connectDB = require("./config/dbConnect");
require("dotenv").config();
require('./models/user')
require('./models/post')

app.use(express.json())


app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



connectDB();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server is running on ${PORT}`);
}); 
