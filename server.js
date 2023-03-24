import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
