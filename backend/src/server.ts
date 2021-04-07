import express from "express";
import authRoute from "./routes/auth";
import listsRoute from "./routes/lists";
import itemsRoute from "./routes/items";
import init from "./utils/init";

const app = express();

(async () => {
  await init();
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/lists", listsRoute);
app.use("/api/items", itemsRoute);

export default app;
