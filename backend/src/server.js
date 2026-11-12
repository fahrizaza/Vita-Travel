import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`Vita Travel API berjalan di http://localhost:${PORT}/api`);
});
