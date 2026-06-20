import express from "express";
import { updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// UPDATE PROFILE ROUTE
router.put(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);

export default router;