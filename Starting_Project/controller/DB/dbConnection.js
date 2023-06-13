const mongoose = require("mongoose");
mongoose.connect(process.env.db_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

then(() => {
  console.log("Connected");
}).catch((err) => {
  console.log("Errors acured while connecting to the Database:", err);
});
