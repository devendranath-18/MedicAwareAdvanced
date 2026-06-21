import express from "express";
import cors from "cors";
import medicineRoutes from "./routes/medicineRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import adminRoutes
from "./routes/adminRoutes.js";
import adminAuthRoutes
from "./routes/adminAuthRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);
app.use(
"/api/requests",
requestRoutes
);
app.use(
"/api/admin",
adminRoutes
);
app.use(
"/api/admin",
adminAuthRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});