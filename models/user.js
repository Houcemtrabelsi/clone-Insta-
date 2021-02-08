const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default:"user"
  },
  url:{
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&usqp=CAU"
  },
  followers:[{type:ObjectId,ref:"User"}],
  following:[{type:ObjectId,ref:"User"}]
});


mongoose.model("user",userSchema)
