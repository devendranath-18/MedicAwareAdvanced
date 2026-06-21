import express from "express";
import {
searchMedicine,
getSuggestions,
requestMedicine,
getMedicineById,
addReview,
  getReviews, scanMedicines
}
from "../controllers/medicineController.js";

const router=express.Router();

router.get("/search",searchMedicine);

router.get("/suggestions",getSuggestions);

router.post("/request",requestMedicine);

router.get("/:id",getMedicineById);
router.post("/review",addReview);

router.get("/:id/reviews",getReviews);
router.post(
"/scan",
scanMedicines
);
export default router;