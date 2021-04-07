import app from "./server";

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Running on port ${port} in ${process.env.NODE_ENV} mode.`)
);
