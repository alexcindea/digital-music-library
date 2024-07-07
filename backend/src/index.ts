import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import artistRoutes from "./routes/artistRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection : This should use enviroment variables.
mongoose
  .connect(
    "mongodb://localhost:27017/music-library?useNewUrlParser=true&useUnifiedTopology=true"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/artists", artistRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
