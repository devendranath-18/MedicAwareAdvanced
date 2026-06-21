import express from "express";

import {
requestMedicine
}
from "../controllers/requestController.js";

const router=express.Router();

router.post(
"/",
requestMedicine
);

export default router;