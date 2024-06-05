const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniquesuffix + "-" + file.originalname);
    }
})

const upload = multer({storage: storage});  

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id", upload.single('image'), userController.createAvatar)

module.exports = router;
