const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API;
const port = process.env.PORT;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(
    "mongodb+srv://dev_m1000:dreamgirl26@cluster0.pstuf.mongodb.net/eShop-database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on http:\\localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
