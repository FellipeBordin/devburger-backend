import app from "./app.js";
import fs from "fs";
import path from "path"; 

const uploadDir =path.resolve("uploads");

if(!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;