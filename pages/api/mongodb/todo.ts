const mongoose = require("mongoose");
// model layer

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    throw new Error(error);
  });
//Database Model
const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const ToDo = mongoose.model("ToDo", toDoSchema);

export default ToDo;
