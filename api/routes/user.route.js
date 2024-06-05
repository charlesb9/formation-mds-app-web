const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userController = require("../controllers/user.controller");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "public", "uploads");

// Vérifiez que le dossier 'uploads' existe, sinon, créez-le
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const filename = file.fieldname + "-" + uniqueSuffix + "-" + file.originalname;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id", upload.single('image'), userController.createAvatar);

module.exports = router;
