import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "backendAPI" })
    .then(() => {
      console.log("connected to the database");
    })
    .catch((e) => {
      console.log(e);
    });
};
