import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
