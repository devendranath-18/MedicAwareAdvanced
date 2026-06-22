import express from "express";

import {
getDashboardStats
}
from "../controllers/adminController.js";
import {
getPendingRequests
}
from "../controllers/adminRequestController.js";
import {
addMedicine
}
from "../controllers/addMedicineController.js";
import adminAuth
from "../middleware/adminAuth.js";
const router=
express.Router();

router.get(
"/stats",
getDashboardStats
);
router.get(
"/requests",
getPendingRequests
);
router.post(
"/add-medicine",
addMedicine
);
import {
rejectRequest
}
from "../controllers/adminController.js";
router.get(
"/requests",
adminAuth,
getPendingRequests
);

router.post(
"/add-medicine",
adminAuth,
addMedicine
);
router.put(
"/reject/:id",
adminAuth,
rejectRequest
);
export default router;