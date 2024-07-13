import mongoose from "mongoose";


const connection = {
  isConnected: 0,
};

export async function connectDb() {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    connection.isConnected = db.connections[0].readyState;

    db.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    db.connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
