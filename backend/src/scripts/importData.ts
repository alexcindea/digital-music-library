import mongoose from "mongoose";
import { Artist } from "../models/artist";
import fs from "fs";
import path from "path";

// Read JSON file
const dataPath = path.join(__dirname, "../../data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const importData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/music-library");

    await Artist.deleteMany({});
    await Artist.insertMany(data);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
