import mongoose, { ConnectOptions } from "mongoose";

const dbConnection = async () => {
  const mongoUrl = process.env.MONGO_URL!;
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.info(`Connected to db: ${mongoose.connection.name}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export default dbConnection;
